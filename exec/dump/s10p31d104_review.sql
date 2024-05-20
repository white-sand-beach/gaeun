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
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `content` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `consumer_id` bigint(20) DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FKh5lqpo5e4u4wwerwu02i5jd2e` (`consumer_id`),
  KEY `FK74d12ba8sxxu9vpnc59b43y30` (`store_id`),
  CONSTRAINT `FK74d12ba8sxxu9vpnc59b43y30` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`),
  CONSTRAINT `FKh5lqpo5e4u4wwerwu02i5jd2e` FOREIGN KEY (`consumer_id`) REFERENCES `consumer` (`consumer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'2024-05-20 05:42:39.765505',NULL,'2024-05-20 05:42:39.765505','넘 맛있어용! 감사합니다!',NULL,4,27),(2,'2024-05-20 05:51:08.869046',NULL,'2024-05-20 05:51:08.869046','사장님 잘먹었습니다. 정말 감사합니다\r\n해피먼치킨 초코맛이 너무 맛있는거 같아요.\r\n다음에도 이런 나눔이 있었으면 좋겠습니다. \r\n항상 감사드리고 천사가게 던킨도넛 짱짱!','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/consumer/1/review-image/f5f543ed-22c9-41c3-b685-7a19b5e5851e.jfif',1,8);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20  6:34:02
