# Workflows n8n preparados en SAFE

## Objetivo

Se dejaron preparados los puntos de integracion entre SAFE y n8n para que el equipo pueda conectar workflows externos sin modificar la arquitectura principal del backend.

El patron usado es:

```text
SAFE dispara workflow -> n8n procesa -> n8n responde a callback SAFE -> SAFE guarda resultado
```

---

## Configuracion

Archivo:

```text
src/main/resources/application.properties
```

Propiedades disponibles:

```properties
safe.api.public-base-url=http://localhost:8080
safe.uploads.dir=uploads
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

n8n.webhook.analisis-cv-url=
n8n.webhook.correccion-evaluacion-url=
n8n.webhook.ranking-url=
n8n.webhook.notificacion-url=
n8n.webhook.result-secret=
```

### Uso

Cada workflow de n8n debe tener su propia URL de webhook y esa URL se pega en la propiedad correspondiente.

Ejemplo:

```properties
n8n.webhook.analisis-cv-url=http://localhost:5678/webhook/analisis-cv
n8n.webhook.correccion-evaluacion-url=http://localhost:5678/webhook/correccion-evaluacion
n8n.webhook.ranking-url=http://localhost:5678/webhook/ranking
n8n.webhook.notificacion-url=http://localhost:5678/webhook/notificacion
```

Si se configura:

```properties
n8n.webhook.result-secret=mi_clave_segura
```

n8n debe devolver todos los callbacks con este header:

```http
X-SAFE-WEBHOOK-SECRET: mi_clave_segura
```

---

## 1. Workflow de analisis de CV

### Cuándo se dispara

Se dispara automaticamente cuando un postulante se postula a un puesto.

Antes de postularse, el postulante debe cargar su CV como archivo real en SAFE:

```http
POST /postulante/perfil/cv
Content-Type: multipart/form-data
Authorization: Bearer <token_postulante>
```

Campo del formulario:

```text
archivo
```

Formatos permitidos:

```text
PDF, JPG, PNG, WEBP
```

El limite configurado es 10MB. SAFE guarda el archivo en `safe.uploads.dir` y actualiza el perfil con una ruta interna como:

```text
/archivos/cv/uuid.pdf
```

Cuando SAFE envia el payload a n8n, transforma esa ruta en URL absoluta usando `safe.api.public-base-url`.

Endpoint interno del flujo:

```http
POST /postulante/postulaciones/{idPuesto}
```

SAFE envia a n8n:

```json
{
  "evento": "ANALISIS_CV",
  "callbackUrl": "http://localhost:8080/webhooks/n8n/analisis-cv",
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
    "experiencia": "Experiencia cargada",
    "estudios": "Estudios cargados",
    "cvUrl": "http://localhost:8080/archivos/cv/uuid.pdf",
    "telefono": "123456",
    "direccion": "Direccion"
  }
}
```

En n8n, el agente puede descargar o leer el archivo desde `postulante.cvUrl`. Si n8n esta desplegado fuera de la PC local, `safe.api.public-base-url` debe apuntar a una URL accesible desde n8n, no a `localhost`.

### Callback que debe llamar n8n

```http
POST /webhooks/n8n/analisis-cv
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

SAFE actualiza la tabla:

```text
postulacion
```

Campos:

```text
Score_IA
Observaciones_IA
Estado
```

---

## 2. Workflow de correccion de evaluaciones

### Cuándo se dispara

Se puede disparar manualmente desde endpoint admin cuando exista una evaluacion asignada.

Endpoint:

```http
POST /admin/workflows/n8n/correccion-evaluacion/{idAsignacion}
```

SAFE envia a n8n:

```json
{
  "evento": "CORRECCION_EVALUACION",
  "callbackUrl": "http://localhost:8080/webhooks/n8n/correccion-evaluacion",
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
      "peso": 10
    }
  ]
}
```

### Callback que debe llamar n8n

```http
POST /webhooks/n8n/correccion-evaluacion
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

Actualmente SAFE guarda el resumen en:

```text
evaluacion_asignada.Observaciones
evaluacion_asignada.Estado
```

Nota:

Cuando se implementen las tablas finales `RespuestaUsuario`, `ResultadoEvaluacion` y `DetalleResultado`, este callback se puede ampliar para guardar el detalle por pregunta.

---

## 3. Workflow de ranking IA

### Cuándo se dispara

Se puede disparar manualmente desde endpoint admin.

Endpoint:

```http
POST /admin/workflows/n8n/ranking
```

SAFE envia a n8n:

```json
{
  "evento": "GENERAR_RANKING",
  "callbackUrl": "http://localhost:8080/webhooks/n8n/ranking",
  "postulaciones": [
    {
      "idPostulante": 10,
      "idPuesto": 1,
      "nombrePuesto": "Backend Java Jr",
      "estado": "ANALIZADO_IA",
      "scoreIa": 82.5,
      "observacionesIa": "Buen perfil",
      "experiencia": "Experiencia cargada",
      "estudios": "Estudios cargados"
    }
  ]
}
```

### Callback que debe llamar n8n

```http
POST /webhooks/n8n/ranking
```

Body esperado:

```json
{
  "ranking": [
    {
      "idPostulante": 10,
      "promedioFinal": 91.5
    },
    {
      "idPostulante": 11,
      "promedioFinal": 84.25
    }
  ]
}
```

SAFE actualiza o crea registros en:

```text
ranking
```

Campos:

```text
id_postulante
promedio_final
```

---

## 4. Workflow de notificaciones

### Cuándo se dispara

Se puede disparar desde endpoint admin con el mensaje/evento que se quiera enviar a n8n.

Endpoint:

```http
POST /admin/workflows/n8n/notificacion
```

Body para disparar workflow:

```json
{
  "idPostulante": 10,
  "mensaje": "Se te asigno una nueva evaluacion.",
  "tipo": "EVALUACION_ASIGNADA",
  "estado": "PENDIENTE_ENVIO",
  "detalle": "Evaluacion Test Java el dia 2026-10-10."
}
```

SAFE envia a n8n:

```json
{
  "evento": "NOTIFICACION",
  "callbackUrl": "http://localhost:8080/webhooks/n8n/notificacion",
  "notificacion": {
    "idPostulante": 10,
    "mensaje": "Se te asigno una nueva evaluacion.",
    "tipo": "EVALUACION_ASIGNADA",
    "estado": "PENDIENTE_ENVIO",
    "detalle": "Evaluacion Test Java el dia 2026-10-10."
  }
}
```

### Callback que debe llamar n8n

```http
POST /webhooks/n8n/notificacion
```

Body esperado:

```json
{
  "idPostulante": 10,
  "mensaje": "Se te asigno una nueva evaluacion.",
  "tipo": "EVALUACION_ASIGNADA",
  "estado": "ENVIADA",
  "detalle": "Correo enviado correctamente por n8n."
}
```

SAFE registra la notificacion en:

```text
notificacion
```

Endpoints para consultar:

```http
GET /admin/notificaciones
GET /admin/notificaciones/postulante/{idPostulante}
```

---

## Endpoints callback publicos

Estos endpoints quedan permitidos sin JWT para que n8n pueda llamarlos:

```http
POST /webhooks/n8n/analisis-cv
POST /webhooks/n8n/correccion-evaluacion
POST /webhooks/n8n/ranking
POST /webhooks/n8n/notificacion
```

Se pueden proteger con:

```properties
n8n.webhook.result-secret=
```

---

## Endpoints admin para disparar workflows

Estos endpoints requieren rol `ADMIN` o `RRHH`:

```http
POST /admin/workflows/n8n/correccion-evaluacion/{idAsignacion}
POST /admin/workflows/n8n/ranking
POST /admin/workflows/n8n/notificacion
```

El analisis de CV se dispara automaticamente al postularse:

```http
POST /postulante/postulaciones/{idPuesto}
```

---

## Archivos principales agregados/modificados

- `src/main/java/com/safe/service/N8nWorkflowService.java`
- `src/main/java/com/safe/controller/N8nWebhookController.java`
- `src/main/java/com/safe/controller/N8nWorkflowController.java`
- `src/main/java/com/safe/controller/NotificacionController.java`
- `src/main/java/com/safe/service/NotificacionService.java`
- `src/main/java/com/safe/model/NotificacionModel.java`
- `src/main/java/com/safe/repository/NotificacionRepository.java`
- `src/main/java/com/safe/service/PostulacionService.java`
- `src/main/java/com/safe/service/EvaluacionAsignadaService.java`
- `src/main/java/com/safe/repository/RankingRepository.java`
- `src/main/java/com/safe/config/SecurityConfig.java`
- `src/main/resources/application.properties`

---

## Estado

Quedan preparados los workflows para:

- Analisis de CV.
- Correccion de evaluaciones.
- Ranking IA.
- Notificaciones/correos.

El equipo de n8n solo debe:

1. Crear los Webhook nodes en n8n.
2. Pegar las URLs en `application.properties`.
3. Configurar los agentes IA.
4. Configurar el HTTP Request final a `callbackUrl`.
5. Respetar los payloads documentados.
