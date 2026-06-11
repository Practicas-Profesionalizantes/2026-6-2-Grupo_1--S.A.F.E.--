-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2026 a las 21:19:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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
-- Estructura de tabla para la tabla `postulacion`
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
-- Volcado de datos para la tabla `postulacion`
--

INSERT INTO `postulacion` (`ID_postulante`, `ID_puesto`, `Fecha_postulacion`, `Estado`, `Score_IA`, `Observaciones_IA`, `Fecha_actualizacion`) VALUES
(8, 1, '2026-06-11 16:13:19', 'PENDIENTE', NULL, NULL, '2026-06-11 16:13:19');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `postulacion`
--
ALTER TABLE `postulacion`
  ADD PRIMARY KEY (`ID_postulante`,`ID_puesto`),
  ADD KEY `ID_puesto` (`ID_puesto`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `postulacion`
--
ALTER TABLE `postulacion`
  ADD CONSTRAINT `postulacion_ibfk_1` FOREIGN KEY (`ID_postulante`) REFERENCES `postulante` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `postulacion_ibfk_2` FOREIGN KEY (`ID_puesto`) REFERENCES `puesto` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
