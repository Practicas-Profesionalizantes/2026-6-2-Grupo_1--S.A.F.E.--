-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2026 at 05:04 AM
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
  `ID` int(11) NOT NULL,
  `ID_postulante` int(11) NOT NULL,
  `Fecha` datetime DEFAULT NULL,
  `Modalidad` varchar(100) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT 'PENDIENTE',
  `Observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `ID_puesto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `evaluacion`
--

INSERT INTO `evaluacion` (`ID`, `Tipo`, `Duracion`, `Puntaje_min`, `Puntaje_max`, `Online`, `ID_puesto`) VALUES
(1, 'Test psicológico', 60, 60.00, 100.00, 1, NULL),
(2, 'Test práctico-teórico', 90, 70.00, 100.00, 1, NULL),
(3, 'Examen final', 120, 75.00, 100.00, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `evaluacion_asignada`
--

CREATE TABLE `evaluacion_asignada` (
  `id` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL,
  `id_postulante` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` enum('PENDIENTE','DISPONIBLE','EN_CURSO','FINALIZADA','VENCIDA') DEFAULT 'PENDIENTE',
  `intento` int(11) DEFAULT 1,
  `fecha_asignacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `ID` int(11) NOT NULL,
  `ID_postulante` int(11) NOT NULL,
  `Mensaje` text NOT NULL,
  `Fecha_envio` datetime DEFAULT current_timestamp(),
  `Tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `info_medica` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `postulante`
--

INSERT INTO `postulante` (`ID`, `nombre`, `apellido`, `telefono`, `estado_civil`, `experiencia`, `Inf_Medica`, `Usuario_id`, `cv_url`, `direccion`, `dni`, `estado`, `estudios`, `fecha_postulacion`, `apto_medico_url`, `experiencia_laboral`, `fecha_nacimiento`, `info_medica`) VALUES
(1, 'Juan', 'Pérez', '555-0101', 'Soltero', '2 años en desarrollo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'María', 'García', '555-0102', 'Casada', '5 años en gestión', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Carlos', 'López', '555-0103', 'Soltero', '1 año en soporte', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Ana', 'Martínez', '555-0104', 'Soltera', '4 años en análisis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Luis', 'Rodríguez', '555-0105', 'Soltero', '3 años en testing', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, NULL, NULL, '1122334455', 'Soltero', NULL, NULL, 12, 'https://cv.com/archivo.pdf', 'Av Siempre Viva 742', NULL, NULL, 'Secundario completo', NULL, 'https://medico.com/apto.pdf', '2 años en seguridad privada', '2002-05-10', 'Apto físico'),
(7, NULL, NULL, '1122334455', 'Soltero', NULL, NULL, 12, 'https://cv.com/archivo.pdf', 'Av Siempre Viva 742', NULL, NULL, 'Secundario completo', NULL, 'https://medico.com/apto.pdf', '2 años en seguridad privada', '2002-05-10', 'Apto físico');

-- --------------------------------------------------------

--
-- Table structure for table `pregunta`
--

CREATE TABLE `pregunta` (
  `ID` int(11) NOT NULL,
  `ID_evaluacion` int(11) NOT NULL,
  `Pregunta` text NOT NULL,
  `Tipo` varchar(50) NOT NULL,
  `Respuesta_correcta` text DEFAULT NULL,
  `Peso` int(11) DEFAULT 10
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
(1, 'Backend Java Jr', 'Tiempo completo', 'Java, Spring Boot, SQL, Git, Python');

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

--
-- Dumping data for table `ranking`
--

INSERT INTO `ranking` (`ID`, `ID_postulante`, `Posicion`, `promedio_final`) VALUES
(5, 1, 2, 85.50),
(6, 2, 1, 92.75),
(7, 3, 5, 68.00),
(8, 4, 3, 78.25),
(9, 5, 4, 71.50);

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
(2, '1221', 'santy', 'test@limail.com', '12345', 'postulante'),
(4, '1650', 'chann', 'vigo32@limail.com', '$2a$10$F0mlY.Lxg8aIE6d50k5nceLo1Zs/s7TbcwmudpWsHDgOWoLo/mTAi', 'postulante'),
(5, '16500', 'chann', 'vigo3232@limail.com', '$2a$10$LnHQMIgiQRxk4OCdOBywKujjRF6eZelun0tJA1TtKtBxRjmsdI9iS', 'postulante'),
(6, NULL, NULL, 'santy12@limail.com', '$2a$10$bwzWKx20bYooiHDfsspedeBYLlOTcI7n5HURg0qEBQ.jzaycnd9D.', 'postulante'),
(7, '123321', 'chanchu', 'santyy@limail.com', '$2a$10$3kpBXIpilmAAieT9UXyHNOB6zfhvginU3.ZguT5JASorPhbV4iH42', 'postulante'),
(8, '1234', 'santy', 'santyy32@limail.com', '$2a$10$LaNQEQkwIZfL4/Yd/qr2JeXibKRq.ueFg2tbUc4VmPKh.6oqsEV/S', 'postulante'),
(9, '471723', 'david', 'vigo1221@gmail.com', '$2a$10$mX/rTVGzfv33HzvRreZaH.ZPXPLioE5ib9eR60mIUHGz1AxBOADJC', 'postulante'),
(10, '472712', 'chann', 'chan123@gmail.com', '$2a$10$2afB91V35p4.oB7DqMexVepkglRrcgWzPxgCBPthZUJYPE5E9Y2li', 'postulante'),
(11, '4334', 'david', 'david123@gmail.com', '$2a$10$f4GwAp90L8fEtw.RtqTv5eMwSSj2SUKLDP6GHd1AaFAuI6Pkg6/DC', 'postulante'),
(12, '12345678', 'Santiago', 'test@gmail.com', '$2a$10$9kciNePPlmXnxGLiAbLH4upHJF.UoHPrGvZZKnaw6IiZBBpgA49Zi', 'postulante'),
(14, '113029', 'santy', 'admin123@gmail.com', '$2a$10$VUhEJfPgPKhqAs2don8qI.QZ3DGXffk5yfSfyT/sCxn0B.HqU5DUq', 'admin');

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
  ADD PRIMARY KEY (`ID`),
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
  ADD PRIMARY KEY (`ID`),
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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `evaluacion_asignada`
--
ALTER TABLE `evaluacion_asignada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `historial`
--
ALTER TABLE `historial`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notificacion`
--
ALTER TABLE `notificacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `postulante`
--
ALTER TABLE `postulante`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `puesto`
--
ALTER TABLE `puesto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ranking`
--
ALTER TABLE `ranking`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
