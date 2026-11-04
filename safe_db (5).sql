-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2026 at 07:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `safe_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cv`
--

CREATE TABLE `cv` (
  `ID` int(11) NOT NULL,
  `Archivo_CV` varchar(255) NOT NULL,
  `Fecha_carga` datetime DEFAULT current_timestamp(),
  `ID_postulante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detalle_resultado`
--

CREATE TABLE `detalle_resultado` (
  `ID` int(11) NOT NULL,
  `ID_resultado` int(11) NOT NULL,
  `ID_pregunta` int(11) NOT NULL,
  `Puntaje` decimal(5,2) DEFAULT NULL,
  `Justificacion_IA` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `entrevista`
--

CREATE TABLE `entrevista` (
  `id` bigint(20) NOT NULL,
  `ID_postulante` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `modalidad` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT 'PENDIENTE',
  `Observaciones` text DEFAULT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `hora` time NOT NULL,
  `resultado` text DEFAULT NULL,
  `ubicacion` varchar(500) DEFAULT NULL,
  `id_puesto` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entrevista`
--

INSERT INTO `entrevista` (`id`, `ID_postulante`, `fecha`, `modalidad`, `Estado`, `Observaciones`, `fecha_creacion`, `hora`, `resultado`, `ubicacion`, `id_puesto`) VALUES
(6, 15, '2026-11-06', 'VIRTUAL', 'PROGRAMADA', '', '2026-11-04 12:42:01.000000', '14:41:00', 'Buen candidato para el puesto, aprobado', 'meet1212', 5);

-- --------------------------------------------------------

--
-- Table structure for table `evaluacion`
--

CREATE TABLE `evaluacion` (
  `ID` int(11) NOT NULL,
  `Tipo` varchar(100) NOT NULL,
  `Duracion` int(11) DEFAULT NULL,
  `Puntaje_min` decimal(5,2) DEFAULT NULL,
  `Puntaje_max` decimal(5,2) DEFAULT NULL,
  `Online` tinyint(1) DEFAULT 1,
  `ID_puesto` int(11) DEFAULT NULL,
  `descripcion` varchar(2000) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `nombre` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `evaluacion`
--

INSERT INTO `evaluacion` (`ID`, `Tipo`, `Duracion`, `Puntaje_min`, `Puntaje_max`, `Online`, `ID_puesto`, `descripcion`, `estado`, `nombre`) VALUES
(4, 'TECNICA', 60, 60.00, 100.00, 1, 1, 'Prueba inicial para backend Java', 'ACTIVA', 'Evaluacion tecnica Java'),
(5, 'TECNICA', 60, 60.00, 100.00, 1, 1, 'Prueba inicial para backend', 'ACTIVA', 'Evaluacion tecnica C++'),
(6, 'ENTREVISTA', 35, 60.00, 100.00, 1, 3, 'Evaluacion para requerimientos', 'ACTIVA', 'Evaluacion Operario'),
(7, 'Virtual', 20, 60.00, 100.00, 1, NULL, 'Evaluacion para postulantes al puesto de analista de datos', 'ACTIVA', 'Analista de datos');

-- --------------------------------------------------------

--
-- Table structure for table `evaluacion_asignada`
--

CREATE TABLE `evaluacion_asignada` (
  `id` bigint(20) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `id_postulante` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` varchar(50) NOT NULL,
  `intento` int(11) DEFAULT 1,
  `fecha_asignacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `observaciones` varchar(1000) DEFAULT NULL,
  `aprobado` bit(1) DEFAULT NULL,
  `id_puesto` bigint(20) DEFAULT NULL,
  `puntaje_max_resultado` decimal(38,2) DEFAULT NULL,
  `puntaje_total` decimal(38,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `evaluacion_asignada`
--

INSERT INTO `evaluacion_asignada` (`id`, `id_evaluacion`, `id_postulante`, `fecha`, `hora_inicio`, `hora_fin`, `estado`, `intento`, `fecha_asignacion`, `observaciones`, `aprobado`, `id_puesto`, `puntaje_max_resultado`, `puntaje_total`) VALUES
(1, 4, 7, '2026-07-15', '09:00:00', '10:00:00', 'ASIGNADA', 1, '2026-07-13 05:44:01', 'Evaluación técnica inicial para el puesto Backend Java Jr.', NULL, NULL, NULL, NULL),
(2, 5, 8, '2026-07-18', '14:30:00', '15:30:00', 'DISPONIBLE', 1, '2026-07-13 05:46:39', 'El postulante debe realizar la evaluación dentro del horario asignado.', NULL, NULL, NULL, NULL),
(3, 4, 11, '2026-09-29', '10:15:00', '11:15:00', 'PENDIENTE', 1, '2026-09-28 06:37:31', 'Sin Trampillas', NULL, NULL, NULL, NULL),
(4, 4, 11, '2026-09-29', '10:00:00', '11:00:00', 'PENDIENTE', 1, '2026-09-28 06:38:09', 'Sin trampillass chaval', NULL, NULL, NULL, NULL),
(5, 4, 13, '2026-10-16', '01:50:00', '02:30:00', 'RESPONDIDA', 1, '2026-10-16 04:50:13', 'Realizar la prueba tecnica de Java', NULL, 1, NULL, NULL),
(6, 4, 13, '2026-10-16', '01:56:00', '02:01:00', 'RESPONDIDA', 1, '2026-10-16 04:57:09', 'aaa', NULL, 1, NULL, NULL),
(7, 4, 13, '2026-10-16', '02:07:00', '02:15:00', 'FINALIZADA', 1, '2026-10-16 05:07:18', 'Resultado IA | puntajeTotal=75 | aprobado=true | observaciones=Puntaje 75/100. P4: 100/100 - El postulante repite exactamente la definición esperada de clase y objeto, cubriendo todo el contenido requerido. | P5: 50/100 - El postulante menciona que una clase hereda atributos de otra, pero omite la palabra clave extends, la extensión de métodos y los beneficios de reutilización y especialización. | P6: 50/100 - El postulante describe correctamente la función de una interfaz y su capacidad de múltiples implementaciones, pero omite la información clave sobre las clases abstractas, como su estado, constructores y la limitación de herencia única. | P7: 85/100 - El candidato menciona correctamente el orden y la ausencia de duplicados en HashSet, y el orden en ArrayList, pero omite la característica de que ArrayList permite duplicados. | P8: 90/100 - El post', b'1', 1, 100.00, 75.00),
(8, 4, 15, '2026-10-29', '03:09:00', '03:15:00', 'PENDIENTE', 1, '2026-10-29 06:07:31', '', NULL, 1, NULL, NULL),
(9, 4, 15, '2026-10-31', '22:50:00', '23:00:00', 'PENDIENTE', 1, '2026-11-01 01:49:11', 'Asignada desde postulacion al puesto Backend Java Jr', NULL, 1, NULL, NULL),
(10, 6, 15, '2026-11-01', '20:20:00', '20:28:00', 'RESPONDIDA', 1, '2026-11-01 23:18:30', 'Asignada desde postulacion al puesto Operario de deposito', NULL, 3, NULL, NULL),
(11, 6, 15, '2026-11-01', '20:40:00', '20:50:00', 'FINALIZADA', 1, '2026-11-01 23:39:36', 'Resultado IA | puntajeTotal=80 | aprobado=true | observaciones=Puntaje 80/100. P9: 100/100 - El postulante seleccionó la opción correcta (B), coincidiendo con la respuesta esperada. | P10: 100/100 - El postulante seleccionó la opción C, que coincide exactamente con la respuesta esperada. | P11: 100/100 - El postulante seleccionó la opción B, que corresponde a la respuesta correcta de 2 cajas. | P12: 100/100 - El postulante indicó la opción correcta (a), que coincide con la respuesta esperada. | P13: 0/100 - El postulante respondió con la opción D, que no corresponde al contenido esperado de secar o avisar para limpiar y evitar resbalones.', b'0', 3, 100.00, 80.00),
(22, 7, 15, '2026-11-04', '14:23:00', '14:30:00', 'PENDIENTE', 1, '2026-11-04 17:22:54', 'Asignada desde postulacion al puesto Analista de Datos', NULL, 15, NULL, NULL),
(23, 7, 14, '2026-11-04', '14:30:00', '14:37:00', 'PENDIENTE', 1, '2026-11-04 17:29:38', 'Asignada desde postulacion al puesto Desarrollador Backend', NULL, 5, NULL, NULL),
(24, 7, 15, '2026-11-04', '14:31:00', '14:39:00', 'FINALIZADA', 1, '2026-11-04 17:30:53', 'Resultado IA | puntajeTotal=20 | observaciones=Puntaje 20/100. P15: 0/100 - El postulante respondió \'falso\', mientras que la respuesta correcta es \'Verdadero\', por lo que no hay similitud semántica. | P16: 100/100 - El postulante respondió exactamente lo esperado, solo difiere en mayúsculas. | P17: 0/100 - El postulante respondió \'verdadero\', contradiciendo la respuesta esperada \'Falso\'. | P18: 0/100 - El postulante respondió \'falso\', lo cual contradice la afirmación correcta de que la media suele ser mayor que la mediana en una distribución con asimetría positiva. | P19: 0/100 - El candidato no menciona la función ni la lógica requerida.', b'1', 15, 100.00, 20.00);

-- --------------------------------------------------------

--
-- Table structure for table `historial`
--

CREATE TABLE `historial` (
  `ID` int(11) NOT NULL,
  `Fecha` datetime DEFAULT current_timestamp(),
  `Accion` varchar(255) NOT NULL,
  `ID_postulante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notificacion`
--

CREATE TABLE `notificacion` (
  `id` bigint(20) NOT NULL,
  `ID_postulante` int(11) NOT NULL,
  `mensaje` varchar(2000) DEFAULT NULL,
  `Fecha_envio` datetime DEFAULT current_timestamp(),
  `Tipo` varchar(100) NOT NULL,
  `detalle` text DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `datos` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notificacion`
--

INSERT INTO `notificacion` (`id`, `ID_postulante`, `mensaje`, `Fecha_envio`, `Tipo`, `detalle`, `estado`, `fecha`, `datos`, `email`, `nombre`) VALUES
(1, 15, 'No se pudo enviar el correo.', '2026-10-29 02:46:24', 'RECHAZO_INICIAL', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-29 02:46:24.000000', NULL, NULL, NULL),
(2, 15, 'No se pudo enviar el correo.', '2026-10-29 02:47:36', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-29 02:47:36.000000', NULL, NULL, NULL),
(3, 15, 'No se pudo enviar el correo.', '2026-10-29 03:08:22', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-29 03:08:21.000000', NULL, NULL, NULL),
(4, 15, 'No se pudo enviar el correo.', '2026-10-31 22:45:19', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 22:45:19.000000', NULL, NULL, NULL),
(5, 15, 'No se pudo enviar el correo.', '2026-10-31 22:59:08', 'RECHAZO_INICIAL', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 22:59:08.000000', NULL, NULL, NULL),
(6, 15, 'No se pudo enviar el correo.', '2026-10-31 23:12:05', 'RECHAZO_INICIAL', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 23:12:05.000000', NULL, NULL, NULL),
(7, 15, 'No se pudo enviar el correo.', '2026-10-31 23:13:07', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 23:13:07.000000', NULL, NULL, NULL),
(8, 15, 'No se pudo enviar el correo.', '2026-10-31 23:18:23', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 23:18:23.000000', NULL, NULL, NULL),
(9, 15, 'No se pudo enviar el correo.', '2026-10-31 23:26:12', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 23:26:12.000000', NULL, NULL, NULL),
(10, 15, 'No se pudo enviar el correo.', '2026-10-31 23:45:31', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 23:45:31.000000', NULL, NULL, NULL),
(11, 15, 'No se pudo enviar el correo.', '2026-10-31 23:46:18', 'RECHAZO_INICIAL', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 23:46:18.000000', NULL, NULL, NULL),
(12, 15, 'No se pudo enviar el correo.', '2026-10-31 23:48:31', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 23:48:30.000000', NULL, NULL, NULL),
(13, 15, 'No se pudo enviar el correo.', '2026-10-31 23:52:22', 'RECHAZO_INICIAL', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 23:52:21.000000', NULL, NULL, NULL),
(14, 15, 'No se pudo enviar el correo.', '2026-10-31 23:56:58', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 23:56:58.000000', NULL, NULL, NULL),
(15, 15, 'No se pudo enviar el correo.', '2026-10-31 23:57:01', 'RECHAZO_INICIAL', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-10-31 23:57:01.000000', NULL, NULL, NULL),
(16, 15, 'No se pudo enviar el correo.', '2026-11-01 00:04:32', 'RECHAZO_INICIAL', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-11-01 00:04:32.000000', NULL, NULL, NULL),
(17, 15, 'No se pudo enviar el correo.', '2026-11-01 00:11:16', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-11-01 00:11:16.000000', NULL, NULL, NULL),
(18, 15, 'No se pudo enviar el correo.', '2026-11-01 00:19:49', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-11-01 00:19:49.000000', NULL, NULL, NULL),
(19, 15, 'No se pudo enviar el correo.', '2026-11-01 00:31:49', 'RECHAZO_INICIAL', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-11-01 00:31:49.000000', NULL, NULL, NULL),
(20, 15, 'No se pudo enviar el correo.', '2026-11-01 00:32:46', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-11-01 00:32:46.000000', NULL, NULL, NULL),
(21, 15, 'No se pudo enviar el correo.', '2026-11-01 00:51:07', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-11-01 00:51:07.000000', NULL, NULL, NULL),
(22, 15, 'No se pudo enviar el correo.', '2026-11-01 00:55:13', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-11-01 00:55:13.000000', NULL, NULL, NULL),
(23, 15, 'No se pudo enviar el correo.', '2026-11-01 00:59:53', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-11-01 00:59:53.000000', NULL, NULL, NULL),
(24, 15, 'Tu postulacion continua en el proceso de seleccion.', '2026-11-01 01:13:42', 'RESULTADO_DISPONIBLE', 'Correo enviado correctamente por n8n.', 'ENVIADA', '2026-11-01 01:13:42.000000', NULL, NULL, NULL),
(25, 15, 'No se pudo enviar el correo.', '2026-11-01 19:39:14', 'RESULTADO_DISPONIBLE', 'Tipo desconocido, email faltante, datos incompletos o falla al enviar el correo.', 'ERROR', '2026-11-01 19:39:13.000000', NULL, NULL, NULL),
(26, 15, 'Tu postulacion continua en el proceso de seleccion.', '2026-11-01 20:00:44', 'RESULTADO_DISPONIBLE', 'Correo enviado correctamente por n8n.', 'ENVIADA', '2026-11-01 20:00:44.000000', NULL, NULL, NULL),
(27, 15, 'Tu postulacion no continua en esta busqueda.', '2026-11-01 20:44:41', 'RECHAZO_INICIAL', 'Correo enviado correctamente por n8n.', 'ENVIADA', '2026-11-01 20:44:41.000000', NULL, NULL, NULL),
(28, 15, 'Aprobaste la evaluacion y continuas en el proceso de seleccion.', '2026-11-02 03:21:43', 'RESULTADO_DISPONIBLE', 'Correo enviado correctamente por n8n.', 'ENVIADA', '2026-11-02 03:21:42.000000', NULL, NULL, NULL),
(29, 15, 'No alcanzaste el resultado esperado en la evaluacion.', '2026-11-02 03:22:51', 'EVALUACION_DESAPROBADA', 'Correo enviado correctamente por n8n.', 'ENVIADA', '2026-11-02 03:22:51.000000', NULL, NULL, NULL),
(30, 14, 'Entrevista asignada enviada correctamente.', '2026-11-04 12:39:19', 'ENTREVISTA_ASIGNADA', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 12:39:19.000000', NULL, NULL, NULL),
(31, 13, 'Entrevista asignada enviada correctamente.', '2026-11-04 12:40:59', 'ENTREVISTA_ASIGNADA', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 12:40:59.000000', NULL, NULL, NULL),
(32, 15, 'Entrevista asignada enviada correctamente.', '2026-11-04 12:42:03', 'ENTREVISTA_ASIGNADA', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 12:42:03.000000', NULL, NULL, NULL),
(33, 15, 'Entrevista asignada enviada correctamente.', '2026-11-04 13:04:43', 'RESULTADO_DISPONIBLE', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 13:04:43.000000', NULL, NULL, NULL),
(34, 15, 'Entrevista asignada enviada correctamente.', '2026-11-04 13:26:57', 'RECHAZO_INICIAL', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 13:26:57.000000', NULL, NULL, NULL),
(35, 15, 'Entrevista asignada enviada correctamente.', '2026-11-04 13:27:16', 'RESULTADO_DISPONIBLE', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 13:27:16.000000', NULL, NULL, NULL),
(36, 15, 'Entrevista asignada enviada correctamente.', '2026-11-04 13:52:17', 'RESULTADO_DISPONIBLE', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 13:52:17.000000', NULL, NULL, NULL),
(37, 14, 'Entrevista asignada enviada correctamente.', '2026-11-04 14:29:42', 'EVALUACION_ASIGNADA', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 14:29:42.000000', NULL, NULL, NULL),
(38, 15, 'Entrevista asignada enviada correctamente.', '2026-11-04 14:30:55', 'EVALUACION_ASIGNADA', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 14:30:55.000000', NULL, NULL, NULL),
(39, 15, 'Entrevista asignada enviada correctamente.', '2026-11-04 14:33:49', 'EVALUACION_DESAPROBADA', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 14:33:49.000000', NULL, NULL, NULL),
(40, 15, 'Entrevista asignada enviada correctamente.', '2026-11-04 14:34:21', 'RESULTADO_DISPONIBLE', 'Correo de entrevista enviado correctamente por n8n.', 'ENVIADA', '2026-11-04 14:34:21.000000', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `postulacion`
--

CREATE TABLE `postulacion` (
  `ID_postulante` int(11) NOT NULL,
  `ID_puesto` int(11) NOT NULL,
  `Fecha_postulacion` datetime DEFAULT current_timestamp(),
  `Estado` varchar(50) DEFAULT 'PENDIENTE',
  `Score_IA` decimal(5,2) DEFAULT NULL,
  `Observaciones_IA` text DEFAULT NULL,
  `Fecha_actualizacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `postulacion`
--

INSERT INTO `postulacion` (`ID_postulante`, `ID_puesto`, `Fecha_postulacion`, `Estado`, `Score_IA`, `Observaciones_IA`, `Fecha_actualizacion`) VALUES
(14, 5, '2026-10-10 20:00:43', 'CUMPLE_CV', 75.00, 'El candidato posee los lenguajes requeridos (Java, Python, PHP) y experiencia como Desarrollador de sistema SAFE, lo que sugiere participación en proyectos. Sin embargo, la experiencia profesional es limitada y su formación está en curso, lo que plantea cierta incertidumbre sobre su nivel de madurez para el puesto de medio tiempo.', '2026-10-10 20:00:43'),
(15, 1, '2026-10-29 02:36:42', 'CUMPLE_CV', NULL, NULL, '2026-10-29 02:36:42'),
(15, 3, '2026-10-31 22:57:48', 'CUMPLE_CV', 20.00, 'El candidato carece de experiencia en depósito y manejo de maquinaria, requisitos esenciales para el puesto. Su formación y habilidades técnicas son relevantes para roles de desarrollo, pero no alinean con las necesidades de un operario de depósito.', '2026-10-31 22:57:48'),
(15, 15, '2026-11-04 13:01:57', 'CUMPLE_CV', 55.00, 'El candidato posee conocimientos de SQL y formación técnica en computación, pero carece de experiencia profesional previa específica como analista de datos. Se presenta como un profesional en fase inicial de carrera.', '2026-11-04 13:01:57');

-- --------------------------------------------------------

--
-- Table structure for table `postulante`
--

CREATE TABLE `postulante` (
  `ID` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `estado_civil` varchar(255) DEFAULT NULL,
  `experiencia` varchar(255) DEFAULT NULL,
  `Inf_Medica` text DEFAULT NULL,
  `Usuario_id` int(11) DEFAULT NULL,
  `cv_url` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `estudios` varchar(2000) DEFAULT NULL,
  `fecha_postulacion` datetime(6) DEFAULT NULL,
  `apto_medico_url` varchar(255) DEFAULT NULL,
  `experiencia_laboral` varchar(2000) DEFAULT NULL,
  `fecha_nacimiento` varchar(255) DEFAULT NULL,
  `info_medica` varchar(2000) DEFAULT NULL,
  `cv_procesamiento_estado` varchar(1000) DEFAULT NULL,
  `cv_texto_extraido` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `postulante`
--

INSERT INTO `postulante` (`ID`, `nombre`, `apellido`, `telefono`, `estado_civil`, `experiencia`, `Inf_Medica`, `Usuario_id`, `cv_url`, `direccion`, `dni`, `estado`, `estudios`, `fecha_postulacion`, `apto_medico_url`, `experiencia_laboral`, `fecha_nacimiento`, `info_medica`, `cv_procesamiento_estado`, `cv_texto_extraido`) VALUES
(7, NULL, NULL, '1122334455', 'Soltero', NULL, NULL, NULL, 'https://cv.com/archivo.pdf', 'Av Siempre Viva 742', NULL, NULL, 'Secundario completo', NULL, 'https://medico.com/apto.pdf', '2 años en seguridad privada', '2002-05-10', 'Apto físico', NULL, NULL),
(8, NULL, NULL, '1859', NULL, NULL, NULL, 15, NULL, 'AvenidaSiempreviva', NULL, NULL, NULL, NULL, NULL, NULL, '22/9', NULL, NULL, NULL),
(9, NULL, NULL, '302951', 'solteiro', NULL, NULL, 16, 'iiiii', 'alicante 1221', NULL, NULL, 'no', NULL, 'no', 'banda de laburo', '22/09/2006', '', NULL, NULL),
(10, NULL, NULL, '153412650', 'casada', NULL, NULL, NULL, 'no', 'mitre1221', NULL, NULL, 'si', NULL, 'nc', 'siii', '24/04/1983', '', NULL, NULL),
(11, NULL, NULL, '165088', 'oaoa', NULL, NULL, 18, 'cv', 'oaoa123', NULL, NULL, 'si', NULL, 'apto', 'semi senior dev', '2006/11/19', '', NULL, NULL),
(12, NULL, NULL, '', '', NULL, NULL, NULL, '', '', NULL, NULL, '', NULL, '', '', '', '', NULL, NULL),
(13, NULL, NULL, '11295196', NULL, NULL, NULL, 20, '/archivos/cv/ba902aef-337b-43ba-95b2-5aa5188624c9.pdf', 'Mitre1221', NULL, NULL, 'Tecnico en Computacion', NULL, NULL, 'Desarrollador de sistema SAFE', '22/09/2006', NULL, 'TEXTO_EXTRAIDO', 'S \nG \nSantiago Gonzalez \nVigo \nTécnico en Computación con formación en desarrollo de software. \nCuento con capacidad para resolver problemas complejos y trabajar \nen equipo bajo metodologías ágiles. Busco mi primera experiencia \nprofesional para aportar soluciones técnicas y seguir creciendo en el \nsector. \nCONTACTO \n◼ 1130295196 \n✉ sgonzalezvgoet32@gmail.co \nm \nAPTITUDES \n• Lenguajes: Java, Php, html, \n python, SQL. \n• Herramientas: Git, \n Metodologías Ágiles (Scrum). \n• Trabajo en equipo \n• Comunicación \n• Resolución de problemas \n• Organización \n• Adaptación al cambio \nFORMACIÓN \nEscuela Tecnica 32 de 14 \"Gral. Jose De San Martin\" \nGarcía 3899 | 03/2020 - En curso \nTecnico en computacion(En proceso): \nComputacion \nIDIOMAS \nEspañol C2 Inglés B1 \nNativo Intermedio'),
(14, NULL, NULL, '1130295169', NULL, NULL, NULL, 21, '/archivos/cv/8cfc25fa-9de0-46ef-afcf-8cc7ac9c39e5.pdf', 'Mitre', NULL, NULL, 'Tecnico en Computacion', NULL, NULL, 'Desarrollador de sistema SAFE', '22/09/2006', NULL, 'TEXTO_EXTRAIDO', 'S \nG \nSantiago Gonzalez \nVigo \nTécnico en Computación con formación en desarrollo de software. \nCuento con capacidad para resolver problemas complejos y trabajar \nen equipo bajo metodologías ágiles. Busco mi primera experiencia \nprofesional para aportar soluciones técnicas y seguir creciendo en el \nsector. \nCONTACTO \n◼ 1130295196 \n✉ sgonzalezvgoet32@gmail.co \nm \nAPTITUDES \n• Lenguajes: Java, Php, html, \n python, SQL. \n• Herramientas: Git, \n Metodologías Ágiles (Scrum). \n• Trabajo en equipo \n• Comunicación \n• Resolución de problemas \n• Organización \n• Adaptación al cambio \nFORMACIÓN \nEscuela Tecnica 32 de 14 \"Gral. Jose De San Martin\" \nGarcía 3899 | 03/2020 - En curso \nTecnico en computacion(En proceso): \nComputacion \nIDIOMAS \nEspañol C2 Inglés B1 \nNativo Intermedio'),
(15, NULL, NULL, '18283823', NULL, NULL, NULL, 22, '/archivos/cv/8b659c0b-4c51-422d-8d8c-911a6a6b0644.pdf', 'Av Siempre Viva', NULL, NULL, 'Tecnico en Computacion ', NULL, NULL, 'Desarrolladore de SAFE', '22/09/06', NULL, 'TEXTO_EXTRAIDO', 'S \nG \nSantiago Gonzalez \nVigo \nTécnico en Computación con formación en desarrollo de software. \nCuento con capacidad para resolver problemas complejos y trabajar \nen equipo bajo metodologías ágiles. Busco mi primera experiencia \nprofesional para aportar soluciones técnicas y seguir creciendo en el \nsector. \nCONTACTO \n◼ 1130295196 \n✉ sgonzalezvgoet32@gmail.co \nm \nAPTITUDES \n• Lenguajes: Java, Php, html, \n python, SQL. \n• Herramientas: Git, \n Metodologías Ágiles (Scrum). \n• Trabajo en equipo \n• Comunicación \n• Resolución de problemas \n• Organización \n• Adaptación al cambio \nFORMACIÓN \nEscuela Tecnica 32 de 14 \"Gral. Jose De San Martin\" \nGarcía 3899 | 03/2020 - En curso \nTecnico en computacion(En proceso): \nComputacion \nIDIOMAS \nEspañol C2 Inglés B1 \nNativo Intermedio');

-- --------------------------------------------------------

--
-- Table structure for table `pregunta`
--

CREATE TABLE `pregunta` (
  `ID` int(11) NOT NULL,
  `ID_evaluacion` int(11) NOT NULL,
  `pregunta` varchar(2000) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `respuesta_correcta` varchar(2000) NOT NULL,
  `peso` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pregunta`
--

INSERT INTO `pregunta` (`ID`, `ID_evaluacion`, `pregunta`, `tipo`, `respuesta_correcta`, `peso`) VALUES
(4, 4, '¿Cuál es la diferencia entre una clase y un objeto en Java?', 'DESARROLLO', 'Una clase es una plantilla que define atributos y métodos. Un objeto es una instancia concreta de esa clase creada en memoria.', 20.00),
(5, 4, 'Explicá qué es la herencia en Java.', 'DESARROLLO', 'La herencia permite que una clase hija reutilice y extienda atributos y métodos de una clase padre mediante la palabra clave extends. Favorece la reutilización y especialización del código.', 20.00),
(6, 4, '¿Cuál es la diferencia entre una interfaz y una clase abstracta?', 'DESARROLLO', 'Una interfaz define principalmente un contrato que las clases implementan y permite implementar múltiples interfaces. Una clase abstracta puede contener estado, constructores y métodos abstractos o implementados, pero una clase solo puede extender una clase.', 20.00),
(7, 4, '¿Qué diferencia existe entre ArrayList y HashSet?', 'DESARROLLO', 'ArrayList mantiene elementos ordenados por posición y permite duplicados. HashSet no garantiza el orden, evita elementos duplicados y normalmente ofrece búsquedas rápidas.', 20.00),
(8, 4, '¿Para qué se utiliza el bloque try-catch?', 'DESARROLLO', 'Se utiliza para manejar excepciones. El bloque try contiene código que puede producir una excepción y el bloque catch permite capturarla y tratarla para evitar una finalización inesperada del programa.', 20.00),
(9, 6, 'Si un semáforo de seguridad en la planta está en ROJO, ¿qué significa?   A) Avanzar rápido antes de que cambie.   B) Detenerse por completo y no pasar. (Correcta)   C) Apagar las luces del depósito.  D) Significa que es la hora del almuerzo.', 'OPCION_MULTIPLE', 'B) Detenerse por completo y no pasar.', 20.00),
(10, 6, '¿Para qué se usan los guantes de protección en una línea de ensamblaje?   A) Para no dejar huellas dactilares en el piso.  B) Para abrigarse las manos en verano.  C) Para proteger las manos de cortes, raspones o productos químicos.  D) Para jugar al fútbol después del turno.', 'OPCION_MULTIPLE', 'C) Para proteger las manos de cortes, raspones o productos químicos.', 20.00),
(11, 6, 'Si te piden juntar 5 cajas y ya llevás 3, ¿cuántas te faltan cargar?  A) 8 cajas  B) 2 cajas  C) 10 cajas  D) 0 cajas', 'OPCION_MULTIPLE', 'B) 2 cajas', 20.00),
(12, 6, '¿Dónde tenés que tirar un envoltorio de plástico limpio?    A) En el tacho de basura que corresponde a plásticos/reciclables.  B) En el medio del pasillo para que alguien se tropiece.   C) Adentro de la máquina en marcha.   D) En el bolsillo del supervisor.', 'OPCION_MULTIPLE', 'A) En el tacho de basura que corresponde a plásticos/reciclables.', 20.00),
(13, 6, '¿Qué hay que hacer si se vuelca un balde con agua en la zona de paso?  A) Sacarle una foto y subirla a Instagram.   B) Secar o avisar para limpiar y evitar resbalones.   C) Saltar el charco y no decir nada.  D) Apagar la luz del depósito.', 'OPCION_MULTIPLE', 'B) Secar o avisar para limpiar y evitar resbalones.', 20.00),
(15, 7, 'Un INNER JOIN devuelve todos los registros de la tabla izquierda y solo los coincidentes de la derecha.', 'VERDADERO_FALSO', 'Verdadero', 20.00),
(16, 7, 'En SQL, la cláusula HAVING se utiliza para filtrar filas antes de que se agrupen los datos con GROUP BY.', 'VERDADERO_FALSO', 'Verdadero', 20.00),
(17, 7, 'Eliminar valores nulos o atípicos (outliers) sin análisis previo siempre mejora la calidad del modelo.', 'VERDADERO_FALSO', 'Falso', 20.00),
(18, 7, 'Una distribución con asimetría positiva se caracteriza porque la media suele ser mayor que la mediana.', 'VERDADERO_FALSO', 'Verdadero', 20.00),
(19, 7, 'Si detectas que en una tabla de base de datos el campo correo_electronico tiene registros duplicados y quieres conservar únicamente el registro más reciente por cada usuario (basándote en una columna llamada fecha_registro), ¿qué función de ventana (window function en SQL) utilizarías para identificarlos y filtrarlos?', 'DESARROLLO', 'Se espera que mencione o utilice la función ROW_NUMBER() particionando por el usuario y ordenando por fecha_registro DESC (para asignar el valor 1 al registro más reciente y poder filtrar o eliminar aquellos donde ROW_NUMBER() > 1).', 20.00);

-- --------------------------------------------------------

--
-- Table structure for table `pregunta_opcion`
--

CREATE TABLE `pregunta_opcion` (
  `id_pregunta` bigint(20) NOT NULL,
  `opcion` varchar(1000) NOT NULL,
  `orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `puesto`
--

CREATE TABLE `puesto` (
  `ID` int(11) NOT NULL,
  `Nombre_Puesto` varchar(150) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `requisitos` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `puesto`
--

INSERT INTO `puesto` (`ID`, `Nombre_Puesto`, `tipo`, `requisitos`) VALUES
(1, 'Backend Java Jr', 'Tiempo completo', 'Java, Spring Boot, SQL, Git, Python'),
(3, 'Operario de deposito', 'Tiempo Completo', 'Experiencia en el rubro, Manejo de maquinaria'),
(5, 'Desarrollador Backend', 'Medio tiempo', 'Experiencia en Proyectos, Python, Java, php'),
(13, 'Dev FullStack', 'Full Time', 'react, sql, php, java, python'),
(14, 'Data Analist', 'Full Time', 'sql , experiencia previa'),
(15, 'Analista de Datos', 'Full time', 'sql y experiencia previa');

-- --------------------------------------------------------

--
-- Table structure for table `ranking`
--

CREATE TABLE `ranking` (
  `ID` int(11) NOT NULL,
  `ID_postulante` int(11) NOT NULL,
  `Posicion` int(11) DEFAULT NULL,
  `promedio_final` decimal(38,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ranking_por_puesto`
--

CREATE TABLE `ranking_por_puesto` (
  `id` int(11) NOT NULL,
  `id_postulante` int(11) NOT NULL,
  `id_puesto` bigint(20) NOT NULL,
  `promedio_final` decimal(38,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `respuesta_evaluacion`
--

CREATE TABLE `respuesta_evaluacion` (
  `id` bigint(20) NOT NULL,
  `fecha_respuesta` datetime(6) DEFAULT NULL,
  `respuesta` text DEFAULT NULL,
  `id_asignacion` bigint(20) NOT NULL,
  `id_pregunta` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `respuesta_evaluacion`
--

INSERT INTO `respuesta_evaluacion` (`id`, `fecha_respuesta`, `respuesta`, `id_asignacion`, `id_pregunta`) VALUES
(1, '2026-10-16 01:54:09.000000', 'Una clase es una plantilla que define atributos y métodos. Un objeto es una instancia concreta de esa clase creada en memoria.', 5, 4),
(2, '2026-10-16 01:54:09.000000', 'La herencia en java es cuando una clase hereda algun atributo de otra clase', 5, 5),
(3, '2026-10-16 01:54:09.000000', 'Una interfaz es un contrato que permite herencia múltiple. Una clase abstracta puede tener estado y lógica interna, pero solo se permite la herencia simple (extender una sola clase).', 5, 6),
(4, '2026-10-16 01:54:09.000000', 'ArrayList mantiene elementos ordenados por posición. HashSet no garantiza el orden, evita elementos duplicados y normalmente ofrece búsquedas rápidas.', 5, 7),
(5, '2026-10-16 01:54:09.000000', 'El bloque try contiene código que puede producir una excepción y el bloque catch permite capturarla y tratarla para evitar una finalización inesperada del programa.', 5, 8),
(6, '2026-10-16 01:59:18.000000', 'Una clase es una plantilla que define atributos y métodos. Un objeto es una instancia concreta de esa clase creada en memoria.', 6, 4),
(7, '2026-10-16 01:59:18.000000', 'La herencia en java es cuando una clase hereda algun atributo o algo de otra clase', 6, 5),
(8, '2026-10-16 01:59:19.000000', 'Una interfaz es un contrato que permite herencia múltiple. Una clase abstracta puede tener estado y lógica interna, pero solo se permite la herencia simple (extender una sola clase).', 6, 6),
(9, '2026-10-16 01:59:19.000000', 'ArrayList mantiene elementos ordenados por posición. HashSet no garantiza el orden, evita elementos duplicados y normalmente ofrece búsquedas rápidas.', 6, 7),
(10, '2026-10-16 01:59:19.000000', 'El bloque try contiene código que puede producir una excepción y el bloque catch permite capturarla y tratarla para evitar una finalización inesperada del programa.', 6, 8),
(11, '2026-10-16 02:15:00.000000', 'Una clase es una plantilla que define atributos y métodos. Un objeto es una instancia concreta de esa clase creada en memoria.', 7, 4),
(12, '2026-10-16 02:15:00.000000', 'La herencia es cuando una clase hereda algun atributo o algo de otra clase', 7, 5),
(13, '2026-10-16 02:15:00.000000', 'Una interfaz define principalmente un contrato que las clases implementan y permite implementar múltiples interfaces.', 7, 6),
(14, '2026-10-16 02:15:00.000000', 'ArrayList mantiene elementos ordenados por posición. HashSet no garantiza el orden, evita elementos duplicados y normalmente ofrece búsquedas rápidas.', 7, 7),
(15, '2026-10-16 02:15:00.000000', 'El bloque try contiene código que puede producir una excepción y el bloque catch permite capturarla y tratarla para evitar una finalización inesperada del programa.', 7, 8),
(16, '2026-11-01 20:28:00.000000', 'b', 10, 9),
(17, '2026-11-01 20:28:00.000000', 'c', 10, 10),
(18, '2026-11-01 20:28:00.000000', 'b', 10, 11),
(19, '2026-11-01 20:28:00.000000', 'a', 10, 12),
(20, '2026-11-01 20:28:00.000000', 'a', 10, 13),
(21, '2026-11-01 20:40:41.000000', 'b', 11, 9),
(22, '2026-11-01 20:40:41.000000', 'c', 11, 10),
(23, '2026-11-01 20:40:41.000000', 'b', 11, 11),
(24, '2026-11-01 20:40:41.000000', 'a', 11, 12),
(25, '2026-11-01 20:40:41.000000', 'd', 11, 13),
(26, '2026-11-04 14:32:55.000000', 'falso', 24, 15),
(27, '2026-11-04 14:32:55.000000', 'verdadero', 24, 16),
(28, '2026-11-04 14:32:55.000000', 'verdadero', 24, 17),
(29, '2026-11-04 14:32:55.000000', 'falso', 24, 18),
(30, '2026-11-04 14:32:55.000000', 'falso', 24, 19);

-- --------------------------------------------------------

--
-- Table structure for table `respuesta_usuario`
--

CREATE TABLE `respuesta_usuario` (
  `ID` int(11) NOT NULL,
  `ID_postulante` int(11) NOT NULL,
  `ID_pregunta` int(11) NOT NULL,
  `Respuesta` text NOT NULL,
  `Puntaje_IA` decimal(5,2) DEFAULT NULL,
  `Observacion_IA` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resultado_evaluacion`
--

CREATE TABLE `resultado_evaluacion` (
  `ID` int(11) NOT NULL,
  `ID_evaluacion` int(11) NOT NULL,
  `ID_postulante` int(11) NOT NULL,
  `Intento` int(11) DEFAULT 1,
  `Puntaje_obtenido` decimal(5,2) DEFAULT NULL,
  `Aprobado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`ID`, `dni`, `nombre`, `email`, `Contrasena`, `rol`) VALUES
(14, '113029', 'santy', 'admin123@gmail.com', '$2a$10$VUhEJfPgPKhqAs2don8qI.QZ3DGXffk5yfSfyT/sCxn0B.HqU5DUq', 'admin'),
(15, '3232', 'chann', 'test2@gmail.com', '$2a$10$a4SIsilSy41ysRzqhRPuwO89gL1H/RnZC3W.Pmx8ZO5mp2STU3Sbq', 'postulante'),
(16, '48182838', 'santy Vigo', 'vigo3232@gmail.com', '$2a$10$4EMKTDTnjvaN37xsP8Clgu.0fuQPnWTqZ8I.x1zb002vBWSsh3Zsi', 'postulante'),
(18, '47172343', 'Santiago Gonzalez Vigo', 'gonzalezvigo@gmail.com', '$2a$10$CtidG2LTc0Jnd6GNR.5CVON/b8DuUdRVoSULc.5ZhGt7Hv2cMQx.u', 'postulante'),
(20, '481828', 'David Vigo', 'david32@gmail.com', '$2a$10$.VkFxARI3nGlPnwLTDNy8OmwRG.0EQgY4yUcI5ozN9hHKSeSqhSwW', 'postulante'),
(21, '47172330', 'Santiago Vigo', 'santy32@gmail.com', '$2a$10$N/qWGVjeqRTYXuc9dxiuUOYBQMt.8ffvAYl3UXqxD7lNlKss1nZgq', 'postulante'),
(22, '48182538', 'Santiago Vigo', 'vigouser847@gmail.com', '$2a$10$EyXG4Jw.XHvfnS/YJT4KZ.me8JqK2xOTJIqBZ.GkQH3i8cFtX9MwK', 'postulante'),
(23, '4919293', 'Martin Vigo', 'tincho1650@gmail.com', '$2a$10$nwCcFFqe9cixTgPNDnNkTOi4CeTIXIFpTgGcOt2FhSc1L6xI.mAbG', 'postulante');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cv`
--
ALTER TABLE `cv`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_postulante` (`ID_postulante`);

--
-- Indexes for table `detalle_resultado`
--
ALTER TABLE `detalle_resultado`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_resultado` (`ID_resultado`),
  ADD KEY `ID_pregunta` (`ID_pregunta`);

--
-- Indexes for table `entrevista`
--
ALTER TABLE `entrevista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ID_postulante` (`ID_postulante`);

--
-- Indexes for table `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_evaluacion_puesto` (`ID_puesto`);

--
-- Indexes for table `evaluacion_asignada`
--
ALTER TABLE `evaluacion_asignada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_eval_asignada_evaluacion` (`id_evaluacion`),
  ADD KEY `fk_eval_asignada_postulante` (`id_postulante`);

--
-- Indexes for table `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_postulante` (`ID_postulante`);

--
-- Indexes for table `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ID_postulante` (`ID_postulante`);

--
-- Indexes for table `postulacion`
--
ALTER TABLE `postulacion`
  ADD PRIMARY KEY (`ID_postulante`,`ID_puesto`),
  ADD KEY `ID_puesto` (`ID_puesto`);

--
-- Indexes for table `postulante`
--
ALTER TABLE `postulante`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Usuario_id` (`Usuario_id`);

--
-- Indexes for table `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_evaluacion` (`ID_evaluacion`);

--
-- Indexes for table `pregunta_opcion`
--
ALTER TABLE `pregunta_opcion`
  ADD PRIMARY KEY (`id_pregunta`,`orden`);

--
-- Indexes for table `puesto`
--
ALTER TABLE `puesto`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `ranking`
--
ALTER TABLE `ranking`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID_postulante` (`ID_postulante`);

--
-- Indexes for table `ranking_por_puesto`
--
ALTER TABLE `ranking_por_puesto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKt10p57hrdrioyyuiajbdvwaxv` (`id_postulante`,`id_puesto`);

--
-- Indexes for table `respuesta_evaluacion`
--
ALTER TABLE `respuesta_evaluacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKftmte96mq52hwv5mdjtvt99ga` (`id_asignacion`);

--
-- Indexes for table `respuesta_usuario`
--
ALTER TABLE `respuesta_usuario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_postulante` (`ID_postulante`),
  ADD KEY `ID_pregunta` (`ID_pregunta`);

--
-- Indexes for table `resultado_evaluacion`
--
ALTER TABLE `resultado_evaluacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_evaluacion` (`ID_evaluacion`),
  ADD KEY `ID_postulante` (`ID_postulante`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `DNI` (`dni`),
  ADD UNIQUE KEY `Email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cv`
--
ALTER TABLE `cv`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detalle_resultado`
--
ALTER TABLE `detalle_resultado`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entrevista`
--
ALTER TABLE `entrevista`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `evaluacion_asignada`
--
ALTER TABLE `evaluacion_asignada`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `historial`
--
ALTER TABLE `historial`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notificacion`
--
ALTER TABLE `notificacion`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `postulante`
--
ALTER TABLE `postulante`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `puesto`
--
ALTER TABLE `puesto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ranking`
--
ALTER TABLE `ranking`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ranking_por_puesto`
--
ALTER TABLE `ranking_por_puesto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `respuesta_evaluacion`
--
ALTER TABLE `respuesta_evaluacion`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `respuesta_usuario`
--
ALTER TABLE `respuesta_usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resultado_evaluacion`
--
ALTER TABLE `resultado_evaluacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cv`
--
ALTER TABLE `cv`
  ADD CONSTRAINT `cv_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `detalle_resultado`
--
ALTER TABLE `detalle_resultado`
  ADD CONSTRAINT `detalle_resultado_ibfk_1` FOREIGN KEY (`ID_resultado`) REFERENCES `resultado_evaluacion` (`ID`),
  ADD CONSTRAINT `detalle_resultado_ibfk_2` FOREIGN KEY (`ID_pregunta`) REFERENCES `pregunta` (`ID`);

--
-- Constraints for table `entrevista`
--
ALTER TABLE `entrevista`
  ADD CONSTRAINT `entrevista_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD CONSTRAINT `fk_evaluacion_puesto` FOREIGN KEY (`ID_puesto`) REFERENCES `puesto` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `evaluacion_asignada`
--
ALTER TABLE `evaluacion_asignada`
  ADD CONSTRAINT `fk_eval_asignada_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`ID`),
  ADD CONSTRAINT `fk_eval_asignada_postulante` FOREIGN KEY (`id_postulante`) REFERENCES `postulante` (`ID`);

--
-- Constraints for table `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `postulacion`
--
ALTER TABLE `postulacion`
  ADD CONSTRAINT `postulacion_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `postulacion_ibfk_2` FOREIGN KEY (`ID_puesto`) REFERENCES `puesto` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `postulante`
--
ALTER TABLE `postulante`
  ADD CONSTRAINT `postulante_ibfk_1` FOREIGN KEY (`Usuario_id`) REFERENCES `usuario` (`ID`) ON DELETE SET NULL;

--
-- Constraints for table `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`ID_evaluacion`) REFERENCES `evaluacion` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `ranking`
--
ALTER TABLE `ranking`
  ADD CONSTRAINT `ranking_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `respuesta_evaluacion`
--
ALTER TABLE `respuesta_evaluacion`
  ADD CONSTRAINT `FKftmte96mq52hwv5mdjtvt99ga` FOREIGN KEY (`id_asignacion`) REFERENCES `evaluacion_asignada` (`id`);

--
-- Constraints for table `respuesta_usuario`
--
ALTER TABLE `respuesta_usuario`
  ADD CONSTRAINT `respuesta_usuario_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `respuesta_usuario_ibfk_2` FOREIGN KEY (`ID_pregunta`) REFERENCES `pregunta` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `resultado_evaluacion`
--
ALTER TABLE `resultado_evaluacion`
  ADD CONSTRAINT `resultado_evaluacion_ibfk_1` FOREIGN KEY (`ID_evaluacion`) REFERENCES `evaluacion` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `resultado_evaluacion_ibfk_2` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
