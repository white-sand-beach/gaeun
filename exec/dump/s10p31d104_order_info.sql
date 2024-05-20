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
-- Table structure for table `order_info`
--

DROP TABLE IF EXISTS `order_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_info` (
  `order_info_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `approved_at` datetime(6) DEFAULT NULL,
  `discount_price` int(11) NOT NULL,
  `order_no` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `original_price` int(11) NOT NULL,
  `payment_id` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `payment_price` int(11) NOT NULL,
  `status` enum('UNPAID','PAID','CANCEL','DENIED','IN_PROGRESS','PREPARED','FINISHED') COLLATE utf8mb4_bin NOT NULL DEFAULT 'UNPAID',
  `taken_time` int(11) DEFAULT NULL,
  `consumer_id` bigint(20) DEFAULT NULL,
  `review_id` bigint(20) DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`order_info_id`),
  UNIQUE KEY `UK_pf1exj9m213bekb11da768d8r` (`review_id`),
  KEY `FKl7wola0mqxchuxkx0o1oef5al` (`consumer_id`),
  KEY `FK2a096yp390rfevvfggp6ny7w3` (`store_id`),
  CONSTRAINT `FK1jodhc0a6w1cf4o3o1ck77t3b` FOREIGN KEY (`review_id`) REFERENCES `review` (`review_id`),
  CONSTRAINT `FK2a096yp390rfevvfggp6ny7w3` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`),
  CONSTRAINT `FKl7wola0mqxchuxkx0o1oef5al` FOREIGN KEY (`consumer_id`) REFERENCES `consumer` (`consumer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_info`
--

LOCK TABLES `order_info` WRITE;
/*!40000 ALTER TABLE `order_info` DISABLE KEYS */;
INSERT INTO `order_info` VALUES (1,'2024-05-20 05:37:20.364969',NULL,'2024-05-20 05:37:20.364969',NULL,67500,'0ca83412-1b3b-48e1-9fd3-1efb4f8b8d11',75000,NULL,7500,'UNPAID',NULL,4,NULL,27),(2,'2024-05-20 05:38:37.576738',NULL,'2024-05-20 05:42:41.367862','2024-05-20 05:41:10.911958',90000,'1dc21af6-abfc-429a-8c5c-a1d4d017eda2',100000,'payment-YgkHdNNCpDeaL164Rx1EFQ8ikWZ6KG',10000,'FINISHED',30,4,1,27),(3,'2024-05-20 05:47:03.215527',NULL,'2024-05-20 05:47:03.215527',NULL,8800,'dd8ef983-b173-4977-9a49-f53e6eb43070',10000,NULL,1200,'UNPAID',NULL,1,NULL,8),(4,'2024-05-20 05:47:38.029171',NULL,'2024-05-20 05:47:38.029171',NULL,8800,'39d2732a-26ad-42ed-abb8-d26eb92e294b',10000,NULL,1200,'UNPAID',NULL,1,NULL,8),(5,'2024-05-20 05:47:44.743877',NULL,'2024-05-20 05:51:09.431550','2024-05-20 05:49:14.333740',8800,'5a7dfd89-7ea4-4c69-b615-e588555a3786',10000,'payment-SROV6s7W4pAVxXzaHWkH1CuCgCJhV8',1200,'FINISHED',30,1,2,8);
/*!40000 ALTER TABLE `order_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20  6:33:47
