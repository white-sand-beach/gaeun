-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: stg-yswa-kr-practice-db-master.mariadb.database.azure.com    Database: s10p31d104
-- ------------------------------------------------------
-- Server version	5.6.47.0

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
-- Table structure for table `order_info_item`
--

DROP TABLE IF EXISTS `order_info_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_info_item` (
  `order_info_item_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `original_price` int(11) NOT NULL,
  `payment_price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `sell_price` int(11) NOT NULL,
  `menu_id` bigint(20) DEFAULT NULL,
  `order_info_id` bigint(20) DEFAULT NULL,
  `sale_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`order_info_item_id`),
  KEY `FKl14gvff6awl5v2jblq5o3yj33` (`menu_id`),
  KEY `FKdfb74ga20hj07jaynrbd3yjab` (`order_info_id`),
  KEY `FKrxdv8c246vn13vbcomlyxbyme` (`sale_id`),
  CONSTRAINT `FKdfb74ga20hj07jaynrbd3yjab` FOREIGN KEY (`order_info_id`) REFERENCES `order_info` (`order_info_id`),
  CONSTRAINT `FKl14gvff6awl5v2jblq5o3yj33` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`),
  CONSTRAINT `FKrxdv8c246vn13vbcomlyxbyme` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_info_item`
--

LOCK TABLES `order_info_item` WRITE;
/*!40000 ALTER TABLE `order_info_item` DISABLE KEYS */;
INSERT INTO `order_info_item` VALUES (1,'2024-05-20 05:37:20.403807',NULL,'2024-05-20 05:37:20.403807',NULL,'돼지볶음(살로만꿀꿀)(빨간양념)',25000,7500,3,2500,87,1,88),(2,'2024-05-20 05:38:37.610344',NULL,'2024-05-20 05:38:37.610344',NULL,'돼지볶음(살로만꿀꿀)(빨간양념)',25000,10000,4,2500,87,2,88),(3,'2024-05-20 05:47:03.245979',NULL,'2024-05-20 05:47:03.245979',NULL,'해피 먼치킨컵',5000,1200,2,600,28,3,30),(4,'2024-05-20 05:47:38.060074',NULL,'2024-05-20 05:47:38.060074',NULL,'해피 먼치킨컵',5000,1200,2,600,28,4,30),(5,'2024-05-20 05:47:44.795453',NULL,'2024-05-20 05:47:44.795453',NULL,'해피 먼치킨컵',5000,1200,2,600,28,5,30);
/*!40000 ALTER TABLE `order_info_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20  6:33:46
