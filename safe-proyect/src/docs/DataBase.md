# Base de Datos SAFE

## Motor

* MySQL

## Tablas Principales

### Usuario

Representa las cuentas de acceso al sistema.

Campos principales:

* ID
* dni
* nombre
* email
* contraseña
* rol

---

### Postulante

Contiene la información laboral y personal del candidato.

Campos principales:

* ID
* nombre
* apellido
* telefono
* direccion
* estudios
* experiencia_laboral
* fecha_nacimiento
* cv_url
* apto_medico_url

Relación:

* Usuario (1:1)

---

### Puesto

Representa las vacantes publicadas.

Campos principales:

* ID
* Nombre_Puesto
* Tipo
* Requisitos

---

### Postulación

Relaciona postulantes con puestos.

Campos principales:

* ID_postulante
* ID_puesto
* Estado
* Score_IA
* Observaciones_IA

Relación:

* Postulante (N:M) Puesto

---

### Evaluación

Representa pruebas técnicas, psicotécnicas o de conocimiento.

Campos principales:

* ID
* Tipo
* Duracion
* Puntaje_min
* Puntaje_max
* Online

---

### Pregunta

Preguntas asociadas a una evaluación.

Campos principales:

* ID
* ID_evaluacion
* Pregunta
* Tipo
* Respuesta_correcta

---

### RespuestaUsuario

Respuestas enviadas por los postulantes.

Campos principales:

* ID
* ID_postulante
* ID_pregunta
* Respuesta
* Correcta

---

### ResultadoEvaluacion

Resultados obtenidos por cada postulante.

Campos principales:

* ID
* ID_evaluacion
* ID_postulante
* Puntaje_obtenido
* Aprobado

---

### Entrevista

Gestiona las entrevistas realizadas.

Campos principales:

* ID
* ID_postulante
* Fecha
* Modalidad
* Estado
* Observaciones

---

### Notificacion

Historial de notificaciones enviadas.

Campos principales:

* ID
* ID_postulante
* Mensaje
* Tipo

---

### Historial

Registro de acciones realizadas sobre un postulante.

Campos principales:

* ID
* Fecha
* Accion
* ID_postulante

---

### CV

Almacena referencias a los currículums cargados.

Campos principales:

* ID
* Archivo_CV
* Fecha_carga
* ID_postulante

---

### Ranking

Ranking de postulantes según desempeño general.

Campos principales:

* ID
* ID_postulante
* Posicion
* promedio_final

---

## Relaciones Principales

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
└── 1:N RespuestaUsuario
