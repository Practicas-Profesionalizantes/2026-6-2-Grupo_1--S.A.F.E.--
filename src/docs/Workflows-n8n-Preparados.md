# Workflows n8n preparados en SAFE

## Objetivo

Este documento define como deben construirse los workflows de n8n que se integran con SAFE.

El patron general es:

```text
SAFE dispara workflow -> n8n procesa -> n8n llama callback SAFE -> SAFE guarda resultado
```

La decision final de contratacion siempre queda en RRHH. La IA solo asiste con analisis, puntajes, observaciones o envio de correos.

---

## Configuracion backend

Archivo:

```text
src/main/resources/application.properties
```

Propiedades usadas por los workflows:

```properties
safe.api.public-base-url=http://localhost:8080
safe.uploads.dir=uploads
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

n8n.webhook.analisis-cv-url=
n8n.webhook.correccion-evaluacion-url=
n8n.webhook.notificacion-url=
n8n.webhook.result-secret=
```

Cada workflow debe tener su webhook productivo de n8n y esa URL se configura en la propiedad correspondiente.

Ejemplo:

```properties
n8n.webhook.analisis-cv-url=https://n8n.midominio.com/webhook/Analizar-cv
n8n.webhook.correccion-evaluacion-url=https://n8n.midominio.com/webhook/correccion-evaluacion
n8n.webhook.notificacion-url=https://n8n.midominio.com/webhook/notificacion
n8n.webhook.result-secret=clave_compartida
```

Si n8n corre fuera de la PC local, `safe.api.public-base-url` debe ser una URL publica accesible desde n8n. No usar `localhost` salvo que n8n corra en la misma maquina que Spring Boot.

Todos los callbacks de n8n hacia SAFE deben incluir este header:

```http
X-SAFE-WEBHOOK-SECRET: <valor de n8n.webhook.result-secret>
```

---

## Reglas comunes para todos los workflows

- Usar Webhook productivo de n8n, no Test URL.
- Respetar nombres y tipos de campos documentados.
- Usar `callbackUrl` recibido cuando aplique.
- Enviar el header `X-SAFE-WEBHOOK-SECRET` en todos los callbacks.
- No guardar secretos escritos dentro del flujo; usar credenciales o variables de n8n.
- Validar la salida de IA antes de llamar al callback.
- Si falla la IA, el parseo o el envio al callback, el workflow debe terminar de forma controlada y registrar el error.
- Exportar el workflow como JSON en `n8n/workflows/` sin credenciales.
- Probar con backend real, no solo con datos mock.

---

## 1. Workflow de analisis de CV

### Estado actual

Implementado y probado con PDF. SAFE acepta solo CV en PDF para evitar errores de OCR/vision.

El PDF debe tener texto seleccionable. Si el PDF es un escaneo o una imagen pegada, el backend puede no extraer texto.

### Cuando se dispara

Se dispara automaticamente cuando un postulante se postula a un puesto:

```http
POST /postulante/postulaciones/{idPuesto}
```

Antes de postularse, el postulante debe cargar el CV:

```http
POST /postulante/perfil/cv
Content-Type: multipart/form-data
Authorization: Bearer <token_postulante>
```

Campo del formulario:

```text
archivo
```

Formato permitido:

```text
PDF
```

SAFE guarda el archivo, extrae texto con PDFBox y guarda:

```text
cvUrl
cvTextoExtraido
cvProcesamientoEstado
```

### Payload enviado a n8n

SAFE envia:

```json
{
  "evento": "ANALISIS_CV",
  "callbackUrl": "https://api-safe-publica.com/webhooks/n8n/analisis-cv",
  "puesto": {
    "id": 1,
    "nombre": "Backend Java Jr",
    "tipo": "Full-time",
    "requisitos": "Java, Spring Boot, SQL"
  },
  "postulante": {
    "id": 10,
    "nombre": "Juan Perez",
    "email": "juan@mail.com",
    "dni": "12345678",
    "experiencia": "Experiencia cargada en el perfil",
    "estudios": "Estudios cargados en el perfil",
    "cvUrl": "https://api-safe-publica.com/archivos/cv/uuid.pdf",
    "cvTextoExtraido": "Texto extraido del PDF...",
    "cvProcesamientoEstado": "TEXTO_EXTRAIDO",
    "telefono": "123456",
    "direccion": "Direccion"
  }
}
```

Valores posibles de `cvProcesamientoEstado`:

```text
TEXTO_EXTRAIDO
SIN_TEXTO: El PDF no contiene texto seleccionable. Puede ser un escaneo y requerir OCR.
ERROR_EXTRACCION: ...
```

### Workflow n8n recomendado

```text
Webhook -> Edit Fields -> AI Agent -> HTTP Request callback
```

No hace falta descargar el PDF en n8n. El backend ya manda `postulante.cvTextoExtraido`.

En `Edit Fields`, crear `chatInput` con:

```text
Datos del puesto:
Nombre: {{$json.body.puesto.nombre}}
Tipo: {{$json.body.puesto.tipo}}
Requisitos: {{$json.body.puesto.requisitos}}

Datos del postulante:
Nombre: {{$json.body.postulante.nombre}}
Email: {{$json.body.postulante.email}}
DNI: {{$json.body.postulante.dni}}
Experiencia: {{$json.body.postulante.experiencia}}
Estudios: {{$json.body.postulante.estudios}}

Texto extraido del CV:
{{$json.body.postulante.cvTextoExtraido}}

Estado de procesamiento del CV:
{{$json.body.postulante.cvProcesamientoEstado}}
```

Reglas del agente:

- Usar `cvTextoExtraido` como fuente principal.
- Comparar el CV contra `puesto.requisitos`.
- Considerar experiencia y estudios del perfil.
- No inventar informacion.
- Si `cvTextoExtraido` esta vacio, aclararlo en `observacionesIa` y evaluar solo con datos disponibles.
- Responder solo JSON valido.

Formato esperado de la IA:

```json
{
  "scoreIa": 82,
  "recomendacion": "RECOMENDADO",
  "observacionesIa": "Buen perfil para el puesto. Cumple Java y SQL, falta experiencia especifica en Spring Boot.",
  "fortalezas": ["Java", "SQL"],
  "debilidades": ["Poca experiencia declarada en Spring Boot"],
  "estado": "ANALIZADO_IA"
}
```

### Callback que debe llamar n8n

Usar el `callbackUrl` recibido o, para pruebas locales, la URL publica del backend:

```http
POST /webhooks/n8n/analisis-cv
```

Headers:

```http
Content-Type: application/json
X-SAFE-WEBHOOK-SECRET: <secret>
```

Body esperado:

```json
{
  "idPostulante": 10,
  "idPuesto": 1,
  "scoreIa": 82.5,
  "observacionesIa": "Buen perfil para el puesto.",
  "estado": "ANALIZADO_IA"
}
```

SAFE actualiza la tabla `postulacion` con:

```text
Score_IA
Observaciones_IA
Estado
```

### Pruebas minimas

- PDF con texto seleccionable y perfil compatible -> score alto.
- PDF con perfil no compatible -> score bajo con observaciones coherentes.
- PDF escaneado o sin texto -> observacion indicando que no se pudo leer texto seleccionable.

---

## 2. Workflow de correccion de evaluaciones

### Cuando se dispara

Endpoint admin:

```http
POST /admin/workflows/n8n/correccion-evaluacion/{idAsignacion}
```

### Payload enviado a n8n

```json
{
  "evento": "CORRECCION_EVALUACION",
  "callbackUrl": "https://api-safe-publica.com/webhooks/n8n/correccion-evaluacion",
  "idAsignacion": 5,
  "evaluacion": {
    "id": 1,
    "nombre": "Test Java",
    "tipo": "TECNICA",
    "puntajeMin": 60,
    "puntajeMax": 100
  },
  "postulante": {
    "id": 10,
    "nombre": "Juan Perez",
    "email": "juan@mail.com"
  },
  "preguntas": [
    {
      "id": 1,
      "pregunta": "Que es Spring Boot?",
      "tipo": "DESARROLLO",
      "respuestaCorrecta": "Respuesta esperada...",
      "respuestaPostulante": "Respuesta escrita por el postulante...",
      "peso": 10
    }
  ]
}
```

El backend ya incluye `respuestaPostulante` por pregunta. Si una pregunta no fue respondida, llega como string vacio y n8n debe puntuarla como 0.

### Entrega de respuestas desde el front

El front obtiene las preguntas reales de la evaluacion asignada con:

```http
GET /postulante/evaluaciones/asignadas/{idAsignacion}/preguntas
```

Este endpoint no devuelve `respuestaCorrecta`, para no exponer la solucion al postulante.

Luego guarda las respuestas del postulante con:

```http
POST /postulante/evaluaciones/asignadas/{idAsignacion}/respuestas
```

Body:

```json
{
  "respuestas": [
    {
      "idPregunta": 1,
      "respuesta": "Spring Boot simplifica la creacion de aplicaciones Java..."
    }
  ]
}
```

Al guardar respuestas, SAFE valida que la evaluacion pertenezca al postulante autenticado, valida fecha y horario, marca la asignacion como `RESPONDIDA` y dispara automaticamente el workflow de correccion si `n8n.webhook.correccion-evaluacion-url` esta configurado.

El front muestra cuenta regresiva hasta `horaFin`. Cuando faltan 5 minutos muestra una advertencia al postulante. Al llegar a `horaFin`, bloquea la edicion y envia automaticamente las respuestas cargadas hasta ese momento. Las preguntas no respondidas llegan a n8n como `respuestaPostulante` vacia y deben puntuar 0.

RRHH puede cargar preguntas desde el panel o usando:

```http
POST /admin/evaluaciones/{idEvaluacion}/preguntas
GET /admin/evaluaciones/{idEvaluacion}/preguntas
DELETE /admin/evaluaciones/preguntas/{idPregunta}
```

### Callback que debe llamar n8n

```http
POST /webhooks/n8n/correccion-evaluacion
```

Headers:

```http
Content-Type: application/json
X-SAFE-WEBHOOK-SECRET: <secret>
```

Body esperado:

```json
{
  "idAsignacion": 5,
  "puntajeTotal": 85,
  "aprobado": true,
  "observacionesIa": "El postulante responde correctamente los conceptos principales.",
  "estado": "FINALIZADA"
}
```

SAFE guarda actualmente resumen y estado en `evaluacion_asignada`.

### Reglas para el equipo

- El calculo de `puntajeTotal` y `aprobado` debe ser deterministico, idealmente con Code node.
- La IA puede asistir con similitud y justificacion, pero no debe decidir sola el aprobado.
- Preguntas sin respuesta deben puntuar 0 sin romper el workflow.

---

## 3. Ranking CV + evaluaciones

El ranking se calcula directamente en Spring Boot. No utiliza n8n, callbacks ni un agente de IA adicional.

La pantalla de RRHH consulta:

```http
GET /ranking
```

El backend calcula el resultado actualizado en cada consulta:

```text
promedioFinal = round(scoreIa * 0.40 + promedioEvaluacionesNormalizado * 0.60, 2)
```

Reglas:

- Solo participan postulaciones con estado `CUMPLE_CV`.
- El score de CV debe estar entre 0 y 100.
- Debe existir al menos una evaluacion asignada para ese puesto.
- Se considera solamente el intento mas reciente de cada evaluacion.
- Todas las evaluaciones consideradas deben estar `FINALIZADA` y tener un puntaje valido.
- Cada nota se normaliza de 0 a 100 utilizando el puntaje maximo guardado al corregirla.
- El ranking se calcula por `idPuesto`; una misma persona puede aparecer en puestos diferentes.
- Se ordena por puesto, puntaje final descendente e identificador de postulante ascendente.
- Los pesos se configuran con `safe.ranking.peso-cv` y `safe.ranking.peso-evaluaciones`, y deben sumar 1.

Ya no deben configurarse `n8n.webhook.ranking-url`, secretos de ranking ni workflows de ranking.

---

## 4. Workflow unico de Gmail / correos

### Decision de arquitectura

Todos los correos se hacen en un unico workflow de n8n.

```text
Webhook notificacion -> Switch por tipo -> Gmail/SMTP -> callback opcional a SAFE
```

No crear un workflow por cada tipo de correo. El workflow debe ramificar por `notificacion.tipo`.

### Separacion de responsabilidades

SAFE separa dos cosas distintas:

```text
Backend SAFE = notificaciones internas del panel/dashboard
n8n Gmail/SMTP = correos externos al postulante
```

Las notificaciones internas del sistema las guarda el backend en la tabla `notificacion`. n8n no debe guardar ni administrar esas notificaciones internas.

n8n solo se usa cuando haya que enviar un correo externo, por ejemplo a Gmail/SMTP.

Estado actual:

- El backend ya tiene endpoint para disparar workflow de notificacion: `POST /admin/workflows/n8n/notificacion`.
- El backend ya tiene callback para registrar resultado: `POST /webhooks/n8n/notificacion`.
- El DTO de notificacion maneja `idPostulante`, `email`, `nombre`, `mensaje`, `tipo`, `estado`, `detalle` y `datos`.
- Si se envia `idPostulante` y no se manda `email`/`nombre`, SAFE intenta completarlos desde el usuario del postulante.
- `datos` queda disponible para variables propias del correo, por ejemplo puesto, evaluacion, fecha y horarios.

### Cuando se dispara

Endpoint admin o eventos del backend:

```http
POST /admin/workflows/n8n/notificacion
```

### Payload recomendado hacia n8n

```json
{
  "evento": "NOTIFICACION",
  "callbackUrl": "https://api-safe-publica.com/webhooks/n8n/notificacion",
  "notificacion": {
    "idPostulante": 10,
    "email": "juan@mail.com",
    "nombre": "Juan Perez",
    "mensaje": "Se te asigno una nueva evaluacion.",
    "tipo": "EVALUACION_ASIGNADA",
    "estado": "PENDIENTE_ENVIO",
    "detalle": "Evaluacion Test Java el dia 2026-10-10.",
    "datos": {
      "puesto": "Backend Java Jr",
      "evaluacion": "Test Java",
      "fecha": "2026-10-10",
      "horaInicio": "09:00",
      "horaFin": "10:00",
      "observaciones": "Presentarse con DNI."
    }
  }
}
```

Si el payload no trae `email` y el backend tampoco lo puede completar desde `idPostulante`, el workflow debe cortar por rama de error y llamar al callback con estado `ERROR`.

### Tipos de correo

Valores iniciales:

```text
EVALUACION_ASIGNADA
RECHAZO_INICIAL
EVALUACION_DESAPROBADA
RESULTADO_DISPONIBLE
ENTREVISTA_AGENDADA (opcional)
```

RRHH ya puede registrar la decision inicial de CV desde el panel de postulaciones:

```http
PATCH /admin/postulaciones/{idPostulante}/{idPuesto}/decision
```

Body:

```json
{
  "cumple": true,
  "observacion": "Perfil compatible para continuar."
}
```

Si `cumple` es `false`, SAFE marca la postulacion como `NO_CUMPLE_CV` y deja preparado el envio de correo tipo `RECHAZO_INICIAL`. Si `cumple` es `true`, marca la postulacion como `CUMPLE_CV` y deja preparado el aviso tipo `RESULTADO_DISPONIBLE`. Si `n8n.webhook.notificacion-url` no esta configurado, solo se guarda el estado.

### Switch en n8n

Crear un nodo Switch que lea:

```text
{{$json.body.notificacion.tipo}}
```

Ramas:

- `EVALUACION_ASIGNADA`: correo con evaluacion, fecha, hora inicio y hora fin.
- `RECHAZO_INICIAL`: correo respetuoso indicando que no continua en esa busqueda. No revelar score ni reglas internas.
- `EVALUACION_DESAPROBADA`: correo indicando que no alcanzo el puntaje minimo.
- `RESULTADO_DISPONIBLE`: correo indicando que hay novedades/resultados disponibles.
- Default: registrar error o llamar callback con estado `ERROR`.

### Gmail / SMTP

Usar un nodo Gmail o SMTP con credencial configurada en n8n.

Reglas:

- No escribir contrasenas ni tokens en nodos.
- El remitente debe ser institucional o de prueba acordado por el equipo.
- El asunto debe ser claro.
- El cuerpo debe ser profesional y sin datos sensibles innecesarios.
- Los rechazos no deben revelar scoring interno ni prompts de IA.

### Callback de notificacion

Se mantiene para registrar si el correo salio o fallo.

```http
POST /webhooks/n8n/notificacion
```

Headers:

```http
Content-Type: application/json
X-SAFE-WEBHOOK-SECRET: <secret>
```

Body exito:

```json
{
  "idPostulante": 10,
  "mensaje": "Se te asigno una nueva evaluacion.",
  "tipo": "EVALUACION_ASIGNADA",
  "estado": "ENVIADA",
  "detalle": "Correo enviado correctamente por n8n."
}
```

Body error:

```json
{
  "idPostulante": 10,
  "mensaje": "No se pudo enviar el correo.",
  "tipo": "EVALUACION_ASIGNADA",
  "estado": "ERROR",
  "detalle": "Descripcion corta del error."
}
```

### Pruebas minimas

- Enviar un correo real por cada `tipo`.
- Probar email invalido o faltante.
- Probar `tipo` desconocido.
- Verificar que no se dupliquen correos.

---

## Endpoints callback publicos

Estos endpoints quedan permitidos sin JWT para que n8n pueda llamarlos:

```http
POST /webhooks/n8n/analisis-cv
POST /webhooks/n8n/correccion-evaluacion
POST /webhooks/n8n/notificacion
```

En produccion deben protegerse con:

```properties
n8n.webhook.result-secret=<secret>
```

---

## Endpoints admin para disparar workflows

Estos endpoints requieren rol `ADMIN` o `RRHH`:

```http
POST /admin/workflows/n8n/correccion-evaluacion/{idAsignacion}
POST /admin/workflows/n8n/notificacion
```

El analisis de CV se dispara automaticamente al postularse:

```http
POST /postulante/postulaciones/{idPuesto}
```

---

## Definicion de terminado para cada workflow

- Webhook productivo configurado y documentado.
- URL del webhook configurada en `application.properties`.
- Payload de entrada validado contra este documento.
- Callback probado contra backend real.
- Header `X-SAFE-WEBHOOK-SECRET` configurado con credencial/variable.
- Caso feliz probado.
- Caso de error probado.
- Workflow exportado como JSON sin credenciales.
- Documentacion actualizada si cambia el contrato.
- Revision cruzada por otro integrante.

---

## Archivos backend principales

- `src/main/java/com/safe/service/N8nWorkflowService.java`
- `src/main/java/com/safe/controller/N8nWebhookController.java`
- `src/main/java/com/safe/controller/N8nWorkflowController.java`
- `src/main/java/com/safe/service/PostulacionService.java`
- `src/main/java/com/safe/service/ArchivoService.java`
- `src/main/java/com/safe/service/EvaluacionAsignadaService.java`
- `src/main/java/com/safe/config/SecurityConfig.java`
- `src/main/resources/application.properties`
