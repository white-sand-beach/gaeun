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
-- Table structure for table `seller_notification`
--

DROP TABLE IF EXISTS `seller_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_notification` (
  `seller_notification_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `is_read` bit(1) NOT NULL DEFAULT b'0',
  `type` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `type_id` bigint(20) NOT NULL,
  `seller_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`seller_notification_id`),
  KEY `FKe2lg3k12l28i7l1cx2ki3tjeu` (`seller_id`),
  CONSTRAINT `FKe2lg3k12l28i7l1cx2ki3tjeu` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`seller_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_notification`
--

LOCK TABLES `seller_notification` WRITE;
/*!40000 ALTER TABLE `seller_notification` DISABLE KEYS */;
INSERT INTO `seller_notification` VALUES (1,'2024-05-20 05:39:20.426478',NULL,'2024-05-20 05:40:42.195988','PAID,1dc21af6-abfc-429a-8c5c-a1d4d017eda2,펭귄요리공장,2024.05.20(월),10000,돼지볶음(살로만꿀꿀)(빨간양념)',_binary '','order',2,27),(2,'2024-05-20 05:42:39.847614',NULL,'2024-05-20 05:42:39.847614','수빈이님의 편지가 도착했어요.',_binary '\0','review',1,27),(3,'2024-05-20 05:48:35.088879',NULL,'2024-05-20 05:48:35.088879','PAID,5a7dfd89-7ea4-4c69-b615-e588555a3786,던킨도넛츠,2024.05.20(월),1200,해피 먼치킨컵',_binary '\0','order',5,8),(4,'2024-05-20 05:51:08.899934',NULL,'2024-05-20 05:51:08.899934','팽둥님의 편지가 도착했어요.',_binary '\0','review',2,8);
/*!40000 ALTER TABLE `seller_notification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20  6:33:42
