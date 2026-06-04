 SAFE — Sistema Inteligente de Reclutamiento y Selección
Objetivo del sistema
SAFE es una plataforma de reclutamiento inteligente que permite automatizar gran parte del proceso de selección de personal mediante el uso de:
gestión de postulantes,
automatización con n8n,
análisis de CV con IA,
evaluaciones automáticas,
y paneles para Recursos Humanos.

Flujo general del sistema
1. Inicio de sesión / Registro
Al ingresar al sistema, el usuario puede:
iniciar sesión,
o crear una cuenta nueva.

Registro del postulante
El registro se realiza en 3 pasos.
Paso 1 — Crear cuenta
El usuario ingresa:
nombre,
apellido,
DNI,
email,
contraseña.
Se crea su cuenta dentro del sistema.

Paso 2 — Datos personales
El postulante completa su perfil laboral:
teléfono,
dirección,
experiencia,
estudios,
habilidades,
disponibilidad,
LinkedIn,
etc.
También sube su CV en formato PDF.
El CV queda guardado en el perfil y podrá utilizarse para futuras postulaciones sin necesidad de volver a subirlo.

Paso 3 — Confirmación
El usuario revisa toda la información ingresada y confirma sus datos.
Luego es redirigido al dashboard principal.

Dashboard del postulante
Dentro del dashboard el usuario puede:
ver puestos disponibles,
consultar sus postulaciones,
revisar estados de selección,
realizar evaluaciones asignadas.

Postulación a puestos
Cada puesto tendrá un botón:
“Postularme”.
Cuando el usuario se postula:
el sistema toma automáticamente:
sus datos personales,
su CV,
su perfil,
y genera la postulación.

Análisis automático con IA
Al generarse una nueva postulación:
Spring Boot envía la información a n8n mediante un webhook.
n8n ejecuta un flujo automatizado donde:
obtiene los datos del postulante,
analiza el CV,
compara habilidades y experiencia con los requisitos del puesto,
genera un score de compatibilidad.
Ejemplo:
Java ✔
Spring ✔
SQL ✔
Docker ✖
Score IA:
85%
La IA también genera observaciones explicando:
fortalezas,
faltantes,
y nivel de compatibilidad.

Panel de Recursos Humanos
RRHH tendrá un panel administrativo donde podrá visualizar:
Postulante
Puesto
Score IA
Estado
Juan Pérez
Backend Java Jr
85%
Pendiente

Al seleccionar un postulante podrá ver:
datos personales,
CV,
análisis IA,
observaciones,
historial,
evaluaciones realizadas.

Decisión de RRHH
RRHH tendrá botones de acción:
Cumple
No cumple
Si el postulante NO cumple
El sistema:
actualiza el estado,
y n8n envía automáticamente un email notificando que no avanzará en el proceso.

Si el postulante SÍ cumple
El sistema:
cambia el estado a “Siguiente etapa”,
envía un email automático,
y habilita las evaluaciones correspondientes.

Sistema de evaluaciones
Los administradores o RRHH podrán cargar evaluaciones:
técnicas,
psicotécnicas,
lógica,
inglés,
etc.
Cuando un postulante es aprobado:
en su dashboard aparece una nueva sección:
“Evaluaciones”.
Ejemplo:
Evaluación
Estado
Test Java
Pendiente
Test Inglés
Pendiente


Corrección automática con IA
Una vez realizada la evaluación:
n8n recibe las respuestas,
la IA corrige automáticamente,
calcula puntajes,
y genera observaciones.
Resultados:
Aprobado
Desaprobado

Panel de resultados para RRHH
RRHH verá una tabla con los resultados:
Postulante
Evaluación
Puntaje
Resultado
Juan Pérez
Java
85%
Aprobado

Opciones:
Invitar entrevista
Rechazar

Automatización de desaprobados
Si el postulante no alcanza el puntaje mínimo:
n8n puede rechazar automáticamente,
y enviar un email notificando el resultado.

Entrevistas
Los postulantes aprobados podrán avanzar a:
entrevista RRHH,
entrevista técnica,
contratación.
RRHH decide manualmente quién continúa.

Tecnologías del proyecto
Frontend
React / Next.js
Backend
Spring Boot
Java
JWT Authentication
Base de datos
MySQL
Automatización
n8n
Inteligencia Artificial
análisis de CV,
scoring,
corrección de evaluaciones,
recomendaciones automáticas.

Objetivo final
SAFE busca optimizar el proceso de reclutamiento:
automatizando tareas repetitivas,
reduciendo tiempos de selección,
mejorando el filtrado de candidatos,
y ayudando a RRHH mediante herramientas inteligentes de análisis y evaluación.
