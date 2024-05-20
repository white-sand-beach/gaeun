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
-- Table structure for table `consumer_notification`
--

DROP TABLE IF EXISTS `consumer_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumer_notification` (
  `consumer_notification_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `is_read` bit(1) NOT NULL DEFAULT b'0',
  `type` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `type_id` bigint(20) NOT NULL,
  `consumer_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`consumer_notification_id`),
  KEY `FK1hrj6l13dt6ot19rys3pgjukb` (`consumer_id`),
  CONSTRAINT `FK1hrj6l13dt6ot19rys3pgjukb` FOREIGN KEY (`consumer_id`) REFERENCES `consumer` (`consumer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumer_notification`
--

LOCK TABLES `consumer_notification` WRITE;
/*!40000 ALTER TABLE `consumer_notification` DISABLE KEYS */;
INSERT INTO `consumer_notification` VALUES (1,'2024-05-20 05:41:10.934593',NULL,'2024-05-20 05:41:10.934593','IN_PROGRESS,1dc21af6-abfc-429a-8c5c-a1d4d017eda2,펭귄요리공장,2024.05.20(월),10000,돼지볶음(살로만꿀꿀)(빨간양념)',_binary '\0','order',2,4),(2,'2024-05-20 05:41:43.739970',NULL,'2024-05-20 05:41:43.739970','PREPARED,1dc21af6-abfc-429a-8c5c-a1d4d017eda2,펭귄요리공장,2024.05.20(월),10000,돼지볶음(살로만꿀꿀)(빨간양념)',_binary '\0','order',2,4),(3,'2024-05-20 05:41:52.614755',NULL,'2024-05-20 05:41:52.614755','FINISHED,1dc21af6-abfc-429a-8c5c-a1d4d017eda2,펭귄요리공장,2024.05.20(월),10000,돼지볶음(살로만꿀꿀)(빨간양념)',_binary '\0','order',2,4),(4,'2024-05-20 05:49:14.353164',NULL,'2024-05-20 05:49:14.353164','IN_PROGRESS,5a7dfd89-7ea4-4c69-b615-e588555a3786,던킨도넛츠,2024.05.20(월),1200,해피 먼치킨컵',_binary '\0','order',5,1),(5,'2024-05-20 05:49:21.056896',NULL,'2024-05-20 05:49:21.056896','PREPARED,5a7dfd89-7ea4-4c69-b615-e588555a3786,던킨도넛츠,2024.05.20(월),1200,해피 먼치킨컵',_binary '\0','order',5,1),(6,'2024-05-20 05:49:30.203576',NULL,'2024-05-20 05:49:39.267831','FINISHED,5a7dfd89-7ea4-4c69-b615-e588555a3786,던킨도넛츠,2024.05.20(월),1200,해피 먼치킨컵',_binary '','order',5,1);
/*!40000 ALTER TABLE `consumer_notification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20  6:33:51
