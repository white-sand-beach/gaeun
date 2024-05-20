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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `imageurl` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(10) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/b7f387ab-82c9-4b93-bae6-bb022c1a6035.png','족발·보쌈'),(2,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/4adc4769-1742-4afa-81da-780782fcd3bc.png','고기·구이'),(3,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/5faf600e-14f0-4e3c-92cc-9087ac71c8d6.png','돈까스·일식'),(4,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/afa4aa6f-ecfe-49b8-acbb-14c496a2e9cf.png','피자·양식'),(5,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/c7f7acc6-b8f7-4d70-b799-184303a02047.png','찜·찌개'),(6,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/73748a80-d589-4db4-bed6-9457cd967129.png','아시안'),(7,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/07022cfa-bb73-41b6-b968-ac73403aad89.png','중식'),(8,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/8fa3dc57-d574-4e48-a4da-971b17d4e90e.png','치킨'),(9,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/67316926-215f-4eaf-ae28-495e095ba6f0.png','도시락'),(10,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/02b440a9-e82d-4f0d-ac9e-f352c409699f.png','샐러드'),(11,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/00cc5589-8602-48ab-9b36-4cac925db426.png','베이커리'),(12,'2024-05-07 10:26:27.212567',NULL,'2024-05-07 10:26:27.212567','https://todayeat-bucket.s3.ap-northeast-2.amazonaws.com/admin/1/category-image/7d69fdde-0f79-461f-8d51-51b99d755c15.png','분식');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20  6:33:53
