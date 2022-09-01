-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: clwxydcjair55xn0.chr7pe7iynqr.eu-west-1.rds.amazonaws.com    Database: p9jg6sitr7cbfwx7
-- ------------------------------------------------------
-- Server version	8.0.28

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comment_post_id_idx` (`post_id`),
  KEY `fk_comment_user_id_idx` (`user_id`),
  CONSTRAINT `fk_comment_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `fk_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,2,2,'<3','2021-04-02 11:16:15'),(2,2,2,'<3','2021-04-02 11:16:52'),(3,2,2,'<3','2021-04-02 11:19:01'),(64,175,11,'“Nothing endures but change.”','2022-09-01 15:40:53');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `author` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  KEY `fk_post_user_id_idx` (`user_id`),
  CONSTRAINT `fk_post_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,3,'','Peace can only come as a natural consequence of universal enlightement','2021-03-30 18:30:07'),(2,3,'Nikola Tesla','Peace can only come as a natural consequence of universal enlightement','2021-04-02 10:28:40'),(3,3,'Nikola Tesla','The day science begins to study non-physical phenomena, it will make more progress in one decade than in all the previous centuries of its existence.','2021-04-05 17:09:33'),(5,3,'Hannibal Lector','Perception is tool that\'s pointed on both ends','2021-04-27 14:43:31'),(6,3,'Carl Sagan','Absence of evidence is not evidence of absence','2021-04-27 20:23:38'),(7,3,'Gandhi','Live as If you were to die tomorrow. Learn as If you were to live forever.','2021-04-27 21:52:01'),(8,3,'Unknown','In vino veritas','2021-05-16 20:28:33'),(141,3,'Viktor Frankl','An abnormal reaction to an abnormal situation is normal behavior.','2021-10-19 22:10:39'),(173,3,'Heraclitus','No man ever steps in the same river twice, for it\'s not the same river and he\'s not the same man.','2022-09-01 12:06:59'),(174,11,'Heraclitus','Man\'s character is his fate.','2022-09-01 15:35:45'),(175,11,'Heraclitus','It is in changing that we find purpose.','2022-09-01 15:36:42');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_hash` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_username` (`username`),
  UNIQUE KEY `uq_user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test1','test1@test.com','B16ED7D24B3ECBD4164DCDAD374E08C0AB7518AA07F9D3683F34C2B3C67A15830268CB4A56C1FF6F54C8E54A795F5B87C08668B51F82D0093F7BAEE7D2981181'),(2,'test2','test2@test.com','fhiuh38943ujf0304985u309jf039j9f04jf-3'),(3,'alex','alex@test.com','35F319CA1DFC9689F5A33631C8F93ED7C3120EE7AFA05B1672C7DF7B71F63A6753DEF5FD3AC9DB2EAF90CCAB6BFF31A486B51C7095FF958D228102B84EFD7736'),(7,'luca','luca@test.com','33AFD882929B8D834FCF0FAB7383EED94F4C9FC226A49434A09FB8B0DC7DA1DEE5116F32C0FE9010CF8FFD0475D8E3EA846FD0B6B5BCA0AE9C61355DD2B92F98'),(8,'admin','admin@test.com','C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC'),(9,'korisnik','korisnik@test.com','396EBBEC80CE4AE542245AE0312111FE054A3FA8B99B33384D8E368BA943DCD41FE78A02AF26FF984D1C9CD9E6CCCA57304DF9CA6C5F2F7E3D08B58FE2BA7BFE'),(11,'user2022','user@mail2022.com','1228C5FF189AE9F88CB60B13FBA4FDB6B19C5276CD4FFCE43D037AB89E214A9F9C25650E0709E35C60CB48A593C36CA5E05A6ED58BE9AFC19A4CFE70E2C0FEC3');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-01 18:04:07
