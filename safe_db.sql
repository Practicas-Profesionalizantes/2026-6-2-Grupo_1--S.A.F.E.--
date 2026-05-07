-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2026 a las 01:42:24
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `safe_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cv`
--

CREATE TABLE `cv` (
  `ID` int(11) NOT NULL,
  `Archivo_CV` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Fecha_carga` datetime DEFAULT current_timestamp(),
  `Cumple_requisitos` tinyint(1) DEFAULT 0,
  `ID_postulante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `ID` int(11) NOT NULL,
  `Tipo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Duracion` int(11) DEFAULT NULL,
  `Puntaje_min` decimal(5,2) DEFAULT NULL,
  `Puntaje_max` decimal(5,2) DEFAULT NULL,
  `Online` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`ID`, `Tipo`, `Duracion`, `Puntaje_min`, `Puntaje_max`, `Online`) VALUES
(1, 'Test psicológico', 60, '60.00', '100.00', 1),
(2, 'Test práctico-teórico', 90, '70.00', '100.00', 1),
(3, 'Examen final', 120, '75.00', '100.00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `ID` int(11) NOT NULL,
  `Fecha` datetime DEFAULT current_timestamp(),
  `Accion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ID_postulante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--

CREATE TABLE `notificacion` (
  `ID` int(11) NOT NULL,
  `ID_postulante` int(11) NOT NULL,
  `Mensaje` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Fecha_envio` datetime DEFAULT current_timestamp(),
  `Tipo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulacion`
--

CREATE TABLE `postulacion` (
  `ID_postulante` int(11) NOT NULL,
  `ID_puesto` int(11) NOT NULL,
  `Fecha_postulacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulante`
--

CREATE TABLE `postulante` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Apellido` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Edad` int(11) NOT NULL,
  `Telefono` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Estado_Civil` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Correo_Electronico` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Experiencia` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Inf_Medica` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `postulante`
--

INSERT INTO `postulante` (`ID`, `Nombre`, `Apellido`, `Edad`, `Telefono`, `Estado_Civil`, `Correo_Electronico`, `Experiencia`, `Inf_Medica`, `Usuario_id`) VALUES
(1, 'Juan', 'Pérez', 28, '555-0101', 'Soltero', 'juan@test.com', '2 años en desarrollo', NULL, NULL),
(2, 'María', 'García', 32, '555-0102', 'Casada', 'maria@test.com', '5 años en gestión', NULL, NULL),
(3, 'Carlos', 'López', 25, '555-0103', 'Soltero', 'carlos@test.com', '1 año en soporte', NULL, NULL),
(4, 'Ana', 'Martínez', 30, '555-0104', 'Soltera', 'ana@test.com', '4 años en análisis', NULL, NULL),
(5, 'Luis', 'Rodríguez', 27, '555-0105', 'Soltero', 'luis@test.com', '3 años en testing', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puesto`
--

CREATE TABLE `puesto` (
  `ID` int(11) NOT NULL,
  `Nombre_Puesto` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Tipo` enum('adm','op') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Requisitos` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ranking`
--

CREATE TABLE `ranking` (
  `ID` int(11) NOT NULL,
  `ID_postulante` int(11) NOT NULL,
  `Posicion` int(11) DEFAULT NULL,
  `promedio_final` decimal(38,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ranking`
--

INSERT INTO `ranking` (`ID`, `ID_postulante`, `Posicion`, `promedio_final`) VALUES
(5, 1, 2, '85.50'),
(6, 2, 1, '92.75'),
(7, 3, 5, '68.00'),
(8, 4, 3, '78.25'),
(9, 5, 4, '71.50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado_evaluacion`
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
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL,
  `dni` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Contrasena` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
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
(11, '4334', 'david', 'david123@gmail.com', '$2a$10$f4GwAp90L8fEtw.RtqTv5eMwSSj2SUKLDP6GHd1AaFAuI6Pkg6/DC', 'postulante');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cv`
--
ALTER TABLE `cv`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_postulante` (`ID_postulante`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_postulante` (`ID_postulante`);

--
-- Indices de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_postulante` (`ID_postulante`);

--
-- Indices de la tabla `postulacion`
--
ALTER TABLE `postulacion`
  ADD PRIMARY KEY (`ID_postulante`,`ID_puesto`),
  ADD KEY `ID_puesto` (`ID_puesto`);

--
-- Indices de la tabla `postulante`
--
ALTER TABLE `postulante`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Usuario_id` (`Usuario_id`);

--
-- Indices de la tabla `puesto`
--
ALTER TABLE `puesto`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `ranking`
--
ALTER TABLE `ranking`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID_postulante` (`ID_postulante`);

--
-- Indices de la tabla `resultado_evaluacion`
--
ALTER TABLE `resultado_evaluacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_evaluacion` (`ID_evaluacion`),
  ADD KEY `ID_postulante` (`ID_postulante`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `DNI` (`dni`),
  ADD UNIQUE KEY `Email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cv`
--
ALTER TABLE `cv`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `postulante`
--
ALTER TABLE `postulante`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `puesto`
--
ALTER TABLE `puesto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ranking`
--
ALTER TABLE `ranking`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `resultado_evaluacion`
--
ALTER TABLE `resultado_evaluacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cv`
--
ALTER TABLE `cv`
  ADD CONSTRAINT `cv_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `postulacion`
--
ALTER TABLE `postulacion`
  ADD CONSTRAINT `postulacion_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `postulacion_ibfk_2` FOREIGN KEY (`ID_puesto`) REFERENCES `puesto` (`ID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `postulante`
--
ALTER TABLE `postulante`
  ADD CONSTRAINT `postulante_ibfk_1` FOREIGN KEY (`Usuario_id`) REFERENCES `usuario` (`ID`) ON DELETE SET NULL;

--
-- Filtros para la tabla `ranking`
--
ALTER TABLE `ranking`
  ADD CONSTRAINT `ranking_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `resultado_evaluacion`
--
ALTER TABLE `resultado_evaluacion`
  ADD CONSTRAINT `resultado_evaluacion_ibfk_1` FOREIGN KEY (`ID_evaluacion`) REFERENCES `evaluacion` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `resultado_evaluacion_ibfk_2` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
