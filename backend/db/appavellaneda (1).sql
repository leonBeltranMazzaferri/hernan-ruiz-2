-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2025 a las 14:28:54
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
-- Base de datos: `appavellaneda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `comentario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_temporales`
--

CREATE TABLE `eventos_temporales` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `latitud` decimal(10,8) NOT NULL,
  `longitud` decimal(10,8) NOT NULL,
  `tema` varchar(50) NOT NULL,
  `hora_inicio` datetime NOT NULL,
  `hora_fin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `eventos_temporales`
--

INSERT INTO `eventos_temporales` (`id`, `titulo`, `latitud`, `longitud`, `tema`, `hora_inicio`, `hora_fin`) VALUES
(1, 'Racing vs Talleres (Activo Ahora)', -34.66740000, -58.36860000, 'estadio', '2025-10-29 11:21:54', '2025-10-29 14:21:54'),
(2, 'Feria de Artesanos y Emprendedores', -34.66220000, -58.36460000, 'cultura', '2025-10-30 10:00:00', '2025-10-30 22:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id` int(11) NOT NULL,
  `titular` varchar(50) NOT NULL,
  `cuerpo` varchar(100) NOT NULL,
  `fecha` date DEFAULT NULL,
  `enlace` varchar(1500) NOT NULL,
  `imagen_url` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`id`, `titular`, `cuerpo`, `fecha`, `enlace`, `imagen_url`) VALUES
(2, 'Gran Final del Torneo de Fútbol Infantil', 'La final se llevará a cabo en el emblemático Estadio Único de Avellaneda este sábado 02 de noviembre', '2025-10-31', 'http://avellaneda.gob.ar/deportes/final-infantil', 'cilindro.jpg'),
(3, 'Nuevo Mural Homenaje a Darío y Maxi', 'Se inauguró un mural en la Avenida Hipólito Yrigoyen en conmemoración de Darío Santillán y Maximilia', '2025-10-30', 'http://avellaneda.gob.ar/cultura/mural-social', 'darioymaxi.jpg'),
(4, 'Reapertura del Teatro Roma con Clásicos', 'Tras meses de renovación, el histórico Teatro Roma reabre sus puertas con una serie de funciones de ', '2025-10-29', 'http://avellaneda.gob.ar/cultura/teatro-roma', 'teatro.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `telefono`, `password`) VALUES
(1, 'leon', 'beltran', 'leonbeltranmazzaferri@gmail.com', '1122500466', 'leon1234'),
(2, 'Leo', 'Bel', 'beltranmazzaferri.leon@tecnica7.edu.ar ', '123456789', 'Leon1234');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventos_temporales`
--
ALTER TABLE `eventos_temporales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gmail` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eventos_temporales`
--
ALTER TABLE `eventos_temporales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
