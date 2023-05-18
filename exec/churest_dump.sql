CREATE DATABASE  IF NOT EXISTS `churest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `churest`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: k8a505.p.ssafy.io    Database: churest
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `bird`
--

DROP TABLE IF EXISTS `bird`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bird` (
  `bird_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`bird_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bird`
--

LOCK TABLES `bird` WRITE;
/*!40000 ALTER TABLE `bird` DISABLE KEYS */;
INSERT INTO `bird` VALUES (1,'저는 평지와 야산의 숲, 숲 주변의 논, 개활지에서 번식해요, 그러나, 집이 사라지고 먹이가 줄어서 살기 너무 힘들어요.','붉은배새매',50),(2,'저는 제주도를 제외한 한국의 해안 전역에서 볼 수 있었어요. 하지만, 갯벌 매립으로 인해 집을 빼앗기고 있어요. 제 집을 찾아주세요.','고대갈매기',50),(3,'저는 동백나무 숲이나 후박나무 숲이 있는 지역에서 살아요. 산림훼손에 의해 친구들이 사라지고 저만 남았어요.','흑비둘기',50),(4,'저는 주로 5월과 9월에 저를 볼 수 있었어요. 그런데, 요즘 기온변화로 가족을 다 잃었어요.','검은머리촉새',50),(5,'저는 제주도와 부산에서 살고 있어요. 그런데, 사람들이 작은 저를 마구 잡아가고 집을 밀어버렸어요.','붉은해오라기',50),(6,'저는 고목나무에 둥지를 틀고 먹이를 구하고 왔는데 집이 사라졌어요. 알고보니 사람들이 제 나무를 밀었던 거예요. 저는 어디로 가야하죠?','올빼미',50),(7,'저는 작고 귀여운 매력의 뱁새예요. 츄레스트의 마스코트로 친구들을 지키고 있어요.','뱁새',100);
/*!40000 ALTER TABLE `bird` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bird_house`
--

DROP TABLE IF EXISTS `bird_house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bird_house` (
  `bird_house_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`bird_house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bird_house`
--

LOCK TABLES `bird_house` WRITE;
/*!40000 ALTER TABLE `bird_house` DISABLE KEYS */;
INSERT INTO `bird_house` VALUES (1,'싱그러운 나뭇잎들이 느껴지는 새집','그린',0),(2,'넓고 푸른 하늘 느낌의 새집','블루',30),(3,'강렬하고 정열적인 느낌의 새집','레드',50);
/*!40000 ALTER TABLE `bird_house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(140) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_time` date DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  `is_payed` bit(1) NOT NULL DEFAULT b'0',
  `title` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weather` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `tree_id` int DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FKsds8ox89wwf6aihinar49rmfy` (`member_id`),
  KEY `FKdkj2blpecfv0rmyo398ndria6` (`tree_id`),
  CONSTRAINT `FKdkj2blpecfv0rmyo398ndria6` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`tree_id`),
  CONSTRAINT `FKsds8ox89wwf6aihinar49rmfy` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_book`
--

DROP TABLE IF EXISTS `guest_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_book` (
  `guest_book_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(140) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_time` datetime(6) DEFAULT NULL,
  `is_deleted` bit(1) DEFAULT b'0',
  `from_member_id` int DEFAULT NULL,
  `to_member_id` int DEFAULT NULL,
  PRIMARY KEY (`guest_book_id`),
  KEY `FKp9ha5dr2k7o7mdirsmkelcljp` (`from_member_id`),
  KEY `FKs91e2x67k4ekhnr8cbjpikb2a` (`to_member_id`),
  CONSTRAINT `FKp9ha5dr2k7o7mdirsmkelcljp` FOREIGN KEY (`from_member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKs91e2x67k4ekhnr8cbjpikb2a` FOREIGN KEY (`to_member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_book`
--

LOCK TABLES `guest_book` WRITE;
/*!40000 ALTER TABLE `guest_book` DISABLE KEYS */;
/*!40000 ALTER TABLE `guest_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `house`
--

DROP TABLE IF EXISTS `house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `house` (
  `house_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`house_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `house`
--

LOCK TABLES `house` WRITE;
/*!40000 ALTER TABLE `house` DISABLE KEYS */;
INSERT INTO `house` VALUES (1,'낮고 아늑한 느낌의 오두막','오두막',0),(2,'튼튼한 중세 마법사집','마법사집',100),(3,'동글동글 귀여운 버섯집','버섯집',150),(4,'앙증맞은 산타집','산타집',200),(5,'포근한 2층집','2층집',100),(6,'작고 귀여운 텐트집','텐트집',50);
/*!40000 ALTER TABLE `house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `avatar_id` int NOT NULL,
  `coin` int NOT NULL DEFAULT '0',
  `email` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fcm_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `grown_tree_count` int NOT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `nickname` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_bird`
--

DROP TABLE IF EXISTS `member_bird`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_bird` (
  `member_bird_id` int NOT NULL AUTO_INCREMENT,
  `created_time` datetime(6) DEFAULT NULL,
  `is_used` bit(1) DEFAULT b'0',
  `nickname` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bird_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`member_bird_id`),
  KEY `FKhc3pxi01s58ipidvu4iflkxmu` (`bird_id`),
  KEY `FKdmk6rowm1qo9hothwprtce31t` (`member_id`),
  CONSTRAINT `FKdmk6rowm1qo9hothwprtce31t` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKhc3pxi01s58ipidvu4iflkxmu` FOREIGN KEY (`bird_id`) REFERENCES `bird` (`bird_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_bird`
--

LOCK TABLES `member_bird` WRITE;
/*!40000 ALTER TABLE `member_bird` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_bird` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_bird_house`
--

DROP TABLE IF EXISTS `member_bird_house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_bird_house` (
  `member_bird_house_id` int NOT NULL AUTO_INCREMENT,
  `is_used` bit(1) DEFAULT b'0',
  `bird_house_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`member_bird_house_id`),
  KEY `FKq9gp41vfma3sm8l3uqum1q6v3` (`bird_house_id`),
  KEY `FK26m0hutxteoh8ox1wie7p8h1p` (`member_id`),
  CONSTRAINT `FK26m0hutxteoh8ox1wie7p8h1p` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKq9gp41vfma3sm8l3uqum1q6v3` FOREIGN KEY (`bird_house_id`) REFERENCES `bird_house` (`bird_house_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_bird_house`
--

LOCK TABLES `member_bird_house` WRITE;
/*!40000 ALTER TABLE `member_bird_house` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_bird_house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_board`
--

DROP TABLE IF EXISTS `member_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_board` (
  `member_board_id` int NOT NULL AUTO_INCREMENT,
  `spot` int NOT NULL,
  `board_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`member_board_id`),
  KEY `FKa6xsiib90bir0p4erpp8lh4sf` (`board_id`),
  KEY `FKqfq4nrymfcjggavstuoo1rl8r` (`member_id`),
  CONSTRAINT `FKa6xsiib90bir0p4erpp8lh4sf` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FKqfq4nrymfcjggavstuoo1rl8r` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_board`
--

LOCK TABLES `member_board` WRITE;
/*!40000 ALTER TABLE `member_board` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_house`
--

DROP TABLE IF EXISTS `member_house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_house` (
  `member_house_id` int NOT NULL AUTO_INCREMENT,
  `is_used` bit(1) DEFAULT b'0',
  `house_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`member_house_id`),
  KEY `FKtmtrfbcxqvduqxikpe73nxpwv` (`house_id`),
  KEY `FKap568v9e103o9sv5opjhks3ug` (`member_id`),
  CONSTRAINT `FKap568v9e103o9sv5opjhks3ug` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKtmtrfbcxqvduqxikpe73nxpwv` FOREIGN KEY (`house_id`) REFERENCES `house` (`house_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_house`
--

LOCK TABLES `member_house` WRITE;
/*!40000 ALTER TABLE `member_house` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `notice_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `is_checked` bit(1) DEFAULT b'0',
  `board_id` int DEFAULT NULL,
  `from_member_id` int DEFAULT NULL,
  `to_member_id` int DEFAULT NULL,
  PRIMARY KEY (`notice_id`),
  KEY `FK9fprbxl106wuljx29qrvc445y` (`board_id`),
  KEY `FKanbfkpjymwg49fdyb4q62e5w3` (`from_member_id`),
  KEY `FK475wfcm95si0x8rrt6a7ard72` (`to_member_id`),
  CONSTRAINT `FK475wfcm95si0x8rrt6a7ard72` FOREIGN KEY (`to_member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FK9fprbxl106wuljx29qrvc445y` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FKanbfkpjymwg49fdyb4q62e5w3` FOREIGN KEY (`from_member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `photo_id` int NOT NULL AUTO_INCREMENT,
  `file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `board_id` int DEFAULT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `FKr59gmjjgs3p9ekvcxmoortmpm` (`board_id`),
  CONSTRAINT `FKr59gmjjgs3p9ekvcxmoortmpm` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `board_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`tag_id`),
  KEY `FKpqu3apaxgw1mg9nt9bjv40gio` (`board_id`),
  KEY `FK4kwcvomqt30obfex433chwghj` (`member_id`),
  CONSTRAINT `FK4kwcvomqt30obfex433chwghj` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKpqu3apaxgw1mg9nt9bjv40gio` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree`
--

DROP TABLE IF EXISTS `tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tree` (
  `tree_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`tree_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree`
--

LOCK TABLES `tree` WRITE;
/*!40000 ALTER TABLE `tree` DISABLE KEYS */;
INSERT INTO `tree` VALUES (1,'산지나 계곡 가장자리, 석회암 지대 등에서 높이 2~4m 정도로 자라요. 드물게 사는 낙엽성 활엽 떨기나무. 한국에서 자연적으로 살아간다는 건 최근에 알려졌어요. 원예식물로 가치가 높지만 개체수가 매우 작은 희귀식물이에요.','산분꽃나무.jpg','산분꽃나무'),(2,'열매의 모양이 둥근 부채를 닮아 아름다운 부채라는 뜻의 미선나무라고 불려요. 한반도의 고유종이며, 경기도와 충청도의 볕이 잘 드는 산기슭에서 자라요. 전세계에서 오직 우리나라에만 있어요!','미선나무.jpg','미선나무'),(3,'울릉도 해안가에서도 절벽과 바위 지대에서 자라는 한국 고유종이에요. 5~6월에 분홍색이 섞인 흰 꽃이 피며 열매는 9~10월에 붉게 익어요. 과거 울릉도 전역에 분포했으나 무분별한 채취와 서식지가 훼손되어 위협을 받는 중이에요.','섬개야광나무.jpg','섬개야광나무'),(4,'제가 전세계에서 가장 아름다운 크리스마스 트리의 원조랍니다. 외국 나무라고 생각하는 분들이 많지만, 사실은 우리나라 토종 나무예요! 한라산, 지리산, 무등산, 덕유산 등 높은 곳에서 살아요. 온난화, 불규칙한 강수량 등의 기후변화로 살기 힘들어요.','구상나무.jpg','구상나무'),(5,'저는 흔하게 볼 수 있지만 사실 멸종위기종이에요. 자주 보는 건 야생 나무가 아닌 모두 인간의 손을 거친 나무랍니다. 어린 나무가 종자를 맺기까지는 30년의 긴 시간이 걸려 야생 번식이 매우 어렵고 종자가 크고 무거워 점차 사라지고 있어요.','은행나무.jpg','은행나무'),(6,'국내에서 자연으로 자란 건 단 3그루만 알려진 희귀 나무예요. 높이가 1m 이하인 어린나무에서 21m에 이르는 큰 나무까지 다양해요. 사람들의 무분별한 채취, 국내에 분포 지역이 극소해 친구들이 사라졌어요.','초령목.jpg','초령목'),(7,'고산지대에서 자라는 사시사철 잎 푸른 나무예요. 높이 25m, 지름 75cm에 달해요. 기후변화에 따른 서식 환경 변화로 인해 주요 서식지인 소백산과 지리산 등에서 사라지고 있다. 소백산에서도 절반이 친구 절반이 없어졌어요.','분비나무.jpg','분비나무');
/*!40000 ALTER TABLE `tree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree_log`
--

DROP TABLE IF EXISTS `tree_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tree_log` (
  `tree_log_id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `score` int NOT NULL,
  `board_id` int DEFAULT NULL,
  PRIMARY KEY (`tree_log_id`),
  KEY `FKdfjfkmfjt5og4keswlrmrtc2u` (`board_id`),
  CONSTRAINT `FKdfjfkmfjt5og4keswlrmrtc2u` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree_log`
--

LOCK TABLES `tree_log` WRITE;
/*!40000 ALTER TABLE `tree_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `tree_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 16:46:47
