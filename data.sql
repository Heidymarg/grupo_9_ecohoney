-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: ecohoney
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id_carrito` int NOT NULL AUTO_INCREMENT,
  `id_prod_en_carrito` int DEFAULT NULL,
  PRIMARY KEY (`id_carrito`),
  CONSTRAINT `id_prod_en_carrito` FOREIGN KEY (`id_carrito`) REFERENCES `productos_en_carrito` (`id_prod_en_carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comprasdeusuarios`
--

DROP TABLE IF EXISTS `comprasdeusuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comprasdeusuarios` (
  `id_Usr` int NOT NULL,
  `id_Products` int NOT NULL,
  `id_Oc` int NOT NULL DEFAULT '100',
  PRIMARY KEY (`id_Usr`,`id_Products`,`id_Oc`),
  KEY `id_Products_idx` (`id_Products`),
  CONSTRAINT `id_Products` FOREIGN KEY (`id_Products`) REFERENCES `productos` (`idPrd`),
  CONSTRAINT `id_Usr` FOREIGN KEY (`id_Usr`) REFERENCES `usuarios` (`idUsr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comprasdeusuarios`
--

LOCK TABLES `comprasdeusuarios` WRITE;
/*!40000 ALTER TABLE `comprasdeusuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comprasdeusuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intereses`
--

DROP TABLE IF EXISTS `intereses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intereses` (
  `id_intereses` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_intereses`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intereses`
--

LOCK TABLES `intereses` WRITE;
/*!40000 ALTER TABLE `intereses` DISABLE KEYS */;
INSERT INTO `intereses` (`id_intereses`, `nombre`) VALUES (1,'Hogar'),(2,'Cuidado Personal'),(3,'Linea Abejas');
/*!40000 ALTER TABLE `intereses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interesesdeusuarios`
--

DROP TABLE IF EXISTS `interesesdeusuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interesesdeusuarios` (
  `id_Usr` int NOT NULL,
  `id_interes` int NOT NULL,
  PRIMARY KEY (`id_Usr`,`id_interes`),
  KEY `id_interes_idx` (`id_interes`),
  CONSTRAINT `id_intereses` FOREIGN KEY (`id_interes`) REFERENCES `intereses` (`id_intereses`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interesesdeusuarios`
--

LOCK TABLES `interesesdeusuarios` WRITE;
/*!40000 ALTER TABLE `interesesdeusuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `interesesdeusuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lineas`
--

DROP TABLE IF EXISTS `lineas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lineas` (
  `id_lineas` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_lineas`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lineas`
--

LOCK TABLES `lineas` WRITE;
/*!40000 ALTER TABLE `lineas` DISABLE KEYS */;
INSERT INTO `lineas` (`id_lineas`, `nombre`) VALUES (1,'Cuidado Personal'),(2,'Hogar'),(3,'Abejas'),(4,'administrador');
/*!40000 ALTER TABLE `lineas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfiles`
--

DROP TABLE IF EXISTS `perfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfiles` (
  `id_perfil` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,
  PRIMARY KEY (`id_perfil`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfiles`
--

LOCK TABLES `perfiles` WRITE;
/*!40000 ALTER TABLE `perfiles` DISABLE KEYS */;
INSERT INTO `perfiles` (`id_perfil`, `nombre`) VALUES (2,'Comprador'),(3,'vendedor'),(11,'Administrador');
/*!40000 ALTER TABLE `perfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idPrd` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `codigo` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `id_lineas` int NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `bonif` varchar(45) NOT NULL,
  `foto` varchar(45) NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`idPrd`),
  KEY `id_lineas_idx` (`id_lineas`),
  CONSTRAINT `id_lineas` FOREIGN KEY (`id_lineas`) REFERENCES `lineas` (`id_lineas`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`idPrd`, `nombre`, `codigo`, `descripcion`, `id_lineas`, `precio`, `bonif`, `foto`, `cantidad`) VALUES (2,'Vaso Plegable','4','Ecologico',2,280.00,'12','/images/foto-1642561851689.jpg',1),(3,'tasa','4','ecologica',2,280.00,'12','/images/foto-1642561936441.jpg',1),(4,'Envoltorios de cera de Abejas','6','cera pura de abeja',3,450.00,'12','/images/foto-1642562192164.jpg',1),(5,'Velas Miel','1','Vela en vaso 100% pura miel, suave olor, ',3,450.00,'12','/images/foto-1642614323207.jpg',1),(6,'Bolas de Lana','2','Suaves para la piel del rostro',1,239.00,'6','/images/foto-1642614922072.jpg',3),(7,'Honey-essence','6','serums facial de abejas',3,750.00,'12','/images/foto-1642615297918.jpg',1),(8,'Pabilo orgánico','3','eco-biodegradable',2,90.00,'10','/images/foto-1642615548409.jpg',1),(9,'Botella bambú','3','Eco-biodegradable',2,276.00,'10','/images/foto-1642615714605.jpg',1),(10,'Crema Nutritiva body','12','Nectar con jalea real miel para el cuerpo',1,675.00,'10','/images/foto-1642617293003.PNG',1),(11,'Miel orgánica','12','100% natural',3,550.00,'8','/images/foto-1642617746395.PNG',1),(12,'Estropajo','13','Esponja vegetal exfoliante natural corporal',1,396.00,'10','/images/foto-1642618132929.jpg',4),(13,'Rollo de cocina','13','Ultra absorbente, elaborados artesanalmente ',2,280.00,'15','/images/foto-1642618734250.jpg',1),(14,'Miel orgánica','13','',1,870.00,'12','/images/foto-1642638989600.PNG',1),(15,'vaso','14','eco-biodegradable',2,450.00,'12','/images/foto-1642639797557.jpg',1),(16,'vaso','14','eco-biodegradable',2,450.00,'12','/images/foto-1642639845360.jpg',1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_en_carrito`
--

DROP TABLE IF EXISTS `productos_en_carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_en_carrito` (
  `id_prod_en_carrito` int NOT NULL AUTO_INCREMENT,
  `id_productos` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id_prod_en_carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_en_carrito`
--

LOCK TABLES `productos_en_carrito` WRITE;
/*!40000 ALTER TABLE `productos_en_carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos_en_carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsr` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `id_perfil` int NOT NULL,
  `id_intereses` int NOT NULL,
  `password` varchar(512) NOT NULL,
  `id_carrito` int DEFAULT NULL,
  PRIMARY KEY (`idUsr`),
  KEY `id_intereses` (`id_intereses`),
  KEY `id_carrito_idx` (`id_carrito`),
  CONSTRAINT `id_carrito` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`idUsr`, `usuario`, `email`, `id_perfil`, `id_intereses`, `password`, `id_carrito`) VALUES (3,'heidymarg57','heidymarg5@gmail.com',3,2,'$2a$10$KF3t61MGeMNulml9EzFGC.OG7SY.XXY5nV/kTIYuEEBIPPi1UABiC',NULL),(4,'heidymarg5@gmail.com','heidymarg5@gmail.com',4,3,'1234',NULL),(5,'heidymarg5@gmail.com','heidymarg5@gmail.com',3,3,'$2a$10$9pybmK0V2D7DALqH8aHfq.CGRLytegx4aVFe1Ht5YUh6lk0PPEouq',NULL),(6,'heidymarg5@gmail.com','heidymarg5@gmail.com',11,5,'$2a$10$8ydlkGWzXRYHeBBt1hB6Jer338sNU5rct1UWjqjcipVnelhkNJ6yq',NULL),(7,'heidy6@gmail.com','heidy6@gmail.com',11,3,'$2a$10$Q1usn0tNtCprAXjX2XaYUegKsA1VQsjTEm4QHxZEKxBASalaba93u',NULL),(8,'robert@ecohoney.com','robert@ecohoney.com',3,2,'$2a$10$a/ZBHVM4W9S4mUhQ39n.0.GU5a1WnEM20ZXwehs44w6INXTMwtPca',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-19 22:10:58
