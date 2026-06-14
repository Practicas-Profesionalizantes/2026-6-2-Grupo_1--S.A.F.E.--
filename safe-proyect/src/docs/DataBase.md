# Base de Datos SAFE

## Motor

* MySQL

---

# Tablas Principales

## Usuario

Representa las cuentas de acceso al sistema.

### Campos principales

* ID
* dni
* nombre
* email
* password
* rol

### Relación

* 1:1 con Postulante

---

## Postulante

Contiene la información laboral y personal del candidato.

### Campos principales

* ID
* ID_usuario
* nombre
* apellido
* telefono
* direccion
* estudios
* experiencia_laboral
* fecha_nacimiento
* cv_url
* apto_medico_url

### Relación

* Usuario (1:1)

---

## Puesto

Representa las vacantes publicadas.

### Campos principales

* ID
* Nombre_Puesto
* Tipo
* Requisitos

---

## Postulación

Relaciona postulantes con puestos.

### Campos principales

* ID
* ID_postulante
* ID_puesto
* Estado
* Score_IA
* Observaciones_IA

### Relación

* Postulante (N:M) Puesto

---

## Evaluación

Representa pruebas técnicas, psicotécnicas o de conocimiento.

### Campos principales

* ID
* Nombre
* Tipo
* Descripcion
* Duracion
* Puntaje_min
* Puntaje_max
* Online
* Estado

### Relación

* 1:N Pregunta
* 1:N ResultadoEvaluacion

---

## Pregunta

Preguntas asociadas a una evaluación.

### Campos principales

* ID
* ID_evaluacion
* Pregunta
* Tipo
* Respuesta_correcta
* Peso

### Descripción

La respuesta correcta será utilizada posteriormente por la IA para comparar la respuesta del postulante y calcular un puntaje de similitud.

### Relación

* N:1 Evaluacion
* 1:N RespuestaUsuario

---

## RespuestaUsuario

Respuestas enviadas por los postulantes.

### Campos principales

* ID
* ID_postulante
* ID_pregunta
* Respuesta
* Puntaje_IA
* Observacion_IA

### Descripción

Almacena la respuesta original del postulante junto con la evaluación realizada por la IA.

---

## ResultadoEvaluacion

Resultados finales obtenidos por cada postulante.

### Campos principales

* ID
* ID_evaluacion
* ID_postulante
* Puntaje_obtenido
* Aprobado
* Fecha

### Descripción

Contiene el resultado general de una evaluación una vez corregidas todas las preguntas.

---

## DetalleResultado

Detalle de corrección por pregunta.

### Campos principales

* ID
* ID_resultado
* ID_pregunta
* Puntaje
* Justificacion_IA

### Descripción

Permite visualizar cómo fue corregida cada pregunta por la IA.

### Relación

* N:1 ResultadoEvaluacion
* N:1 Pregunta

---

## Entrevista

Gestiona las entrevistas realizadas.

### Campos principales

* ID
* ID_postulante
* Fecha
* Modalidad
* Estado
* Observaciones

---

## Notificacion

Historial de notificaciones enviadas.

### Campos principales

* ID
* ID_postulante
* Mensaje
* Tipo
* Fecha

---

## Historial

Registro de acciones realizadas sobre un postulante.

### Campos principales

* ID
* Fecha
* Accion
* ID_postulante

---

## CV

Almacena referencias a los currículums cargados.

### Campos principales

* ID
* Archivo_CV
* Fecha_carga
* ID_postulante

---

## Ranking

Ranking general de postulantes.

### Campos principales

* ID
* ID_postulante
* Posicion
* Promedio_final

### Descripción

Puede generarse automáticamente a partir de los resultados de evaluaciones y análisis IA.

---

# Relaciones Principales

Usuario
└── 1:1 Postulante

Postulante
├── 1:N CV
├── 1:N Entrevista
├── 1:N Historial
├── 1:N Notificacion
├── 1:N ResultadoEvaluacion
├── 1:N RespuestaUsuario
└── N:M Puesto (mediante Postulacion)

Puesto
├── 1:N Evaluacion
└── N:M Postulante (mediante Postulacion)

Evaluacion
├── 1:N Pregunta
└── 1:N ResultadoEvaluacion

Pregunta
├── 1:N RespuestaUsuario
└── 1:N DetalleResultado

ResultadoEvaluacion
└── 1:N DetalleResultado

---

# Integración con IA (n8n)

## Análisis de CV

* SAFE envía CV y datos del postulante a n8n.
* La IA calcula compatibilidad con el puesto.
* Se genera:

  * Score IA.
  * Observaciones IA.

---

## Corrección de Evaluaciones

SAFE enviará a n8n:

* Pregunta.
* Respuesta correcta.
* Respuesta del postulante.

La IA devolverá:

* Puntaje.
* Nivel de similitud.
* Justificación.

SAFE almacenará dicha información en:

* RespuestaUsuario
* DetalleResultado
* ResultadoEvaluacion

---

## Ranking Automático

SAFE podrá generar rankings utilizando:

* Score IA del CV.
* Resultados de evaluaciones.
* Puntajes obtenidos.
* Compatibilidad con el puesto.

La decisión final siempre será tomada por RRHH.
