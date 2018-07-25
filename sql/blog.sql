/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 25/07/2018 17:03:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `articleId` int(8) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `userId` int(8) NOT NULL,
  `release_time` varchar(50) NOT NULL,
  `preview_count` int(8) unsigned NOT NULL,
  `commnet_count` int(8) unsigned NOT NULL,
  `like_count` int(8) unsigned NOT NULL,
  `related_img` text,
  `thumbnail_article` varchar(255) NOT NULL,
  PRIMARY KEY (`articleId`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (14, '文章标题', '<p>限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示</p>\n', 1, '2018.07.17 16:59', 0, 0, 100, 'http://upload-images.jianshu.io/upload_images/2239034-051aa6a34c3c1100.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240', '限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示');
INSERT INTO `article` VALUES (15, '文章标题', '<p>限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示</p>\n', 1, '2018.07.17 17:00', 0, 0, 201, '', '限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示');
INSERT INTO `article` VALUES (17, '无标题文章', '<p>haodednlncjfnv<img src=\"http://127.0.0.1:7777/resource/fd5b1a554465d4f075d2f91e4edba067.png\" alt=\"fd5b1a554465d4f075d2f91e4edba067.png\" /></p>\n', 1, '2018.07.20 16:59', 0, 0, 300, 'http://127.0.0.1:7777/resource/fd5b1a554465d4f075d2f91e4edba067.png', 'haodednlncjfnv');
INSERT INTO `article` VALUES (18, '无标题文章', '<p>我开始了不是眨眼，你如果展演的话，你会错过最精彩的便读<img src=\"http://127.0.0.1:7777/resource/fd5b1a554465d4f075d2f91e4edba067.png\" alt=\"fd5b1a554465d4f075d2f91e4edba067.png\" />好吧，我成认你是对的，我说的是错的，那又怎样，我就是不改</p>\n', 1, '2018.07.20 17:22', 0, 0, 400, 'http://127.0.0.1:7777/resource/fd5b1a554465d4f075d2f91e4edba067.png', '我开始了不是眨眼，你如果展演的话，你会错过最精彩的便读');
INSERT INTO `article` VALUES (20, '无标题文章', '<p>我又来测试了<img src=\"http://127.0.0.1:7777/resource/fd5b1a554465d4f075d2f91e4edba067.png\" alt=\"fd5b1a554465d4f075d2f91e4edba067.png\" />defect</p>\n', 2, '2018.07.23 14:32', 0, 0, 783, 'http://127.0.0.1:7777/resource/fd5b1a554465d4f075d2f91e4edba067.png', '我又来测试了');
INSERT INTO `article` VALUES (21, '无标题文章', '<p>发热发热分    <img src=\"http://127.0.0.1:7777/resource/fd5b1a554465d4f075d2f91e4edba067.png\" alt=\"fd5b1a554465d4f075d2f91e4edba067.png\" />                 非发热分而非范儿</p>\n', 2, '2018.07.23 14:37', 0, 0, 10001, 'http://127.0.0.1:7777/resource/fd5b1a554465d4f075d2f91e4edba067.png', '发热发热分    ');
INSERT INTO `article` VALUES (22, '无标题文章', '<p>的我v<img src=\"http://127.0.0.1:7777/resource/fd5b1a554465d4f075d2f91e4edba067.png\" alt=\"fd5b1a554465d4f075d2f91e4edba067.png\" /><br />\n的玩法</p>\n', 2, '2018.07.23 15:02', 0, 0, 2, 'http://127.0.0.1:7777/resource/fd5b1a554465d4f075d2f91e4edba067.png', '的我v');
COMMIT;

-- ----------------------------
-- Table structure for likeArticle
-- ----------------------------
DROP TABLE IF EXISTS `likeArticle`;
CREATE TABLE `likeArticle` (
  `likeId` int(10) NOT NULL AUTO_INCREMENT,
  `articleId` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `state` int(2) NOT NULL,
  PRIMARY KEY (`likeId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of likeArticle
-- ----------------------------
BEGIN;
INSERT INTO `likeArticle` VALUES (1, 14, 1, 0);
INSERT INTO `likeArticle` VALUES (2, 17, 2, 1);
INSERT INTO `likeArticle` VALUES (10, 20, 2, 0);
INSERT INTO `likeArticle` VALUES (11, 14, 2, 0);
INSERT INTO `likeArticle` VALUES (12, 15, 2, 1);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(8) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `permissions` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'root', 'e10adc3949ba59abbe56e057f20f883e', 'eyJhbGciOiJIUzI1NiIsImV4cCI6MTUwOTY5MjU5OSwiaWF0IjoxNTA5Njg2NTk5fQ.eyJpZCI6bnVsbH0.ZQcw3Sas-TVW4Dso8ok2dfbXLs-to65n84ihxOXiWLY', 'https://i.loli.net/2017/08/21/599a521472424.jpg', '1');
INSERT INTO `user` VALUES (2, 'mory', 'e10adc3949ba59abbe56e057f20f883e', 'eyJhbGciOiJIUzI1NiIsImV4cCI6MTUwOTY5MjU5OSwiaWF0IjoxNTA5Njg2NTk5fQ.eyJpZCI6bnVsbH0.ZQcw3Sas-TVW4Dso8ok2dfbXLs-to65n84ihxOXiWLZ', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532336898040&di=86307303feaff8edcbbb971f6f8923aa&imgtype=0&src=http%3A%2F%2Ftvax1.sinaimg.cn%2Fcrop.0.0.996.996.1024%2F005X7W89ly8fm6a9qh9noj30ro0ro0v4.jpg', NULL);
COMMIT;

-- ----------------------------
-- Table structure for userComment
-- ----------------------------
DROP TABLE IF EXISTS `userComment`;
CREATE TABLE `userComment` (
  `commentId` int(8) NOT NULL AUTO_INCREMENT,
  `articleId` int(8) NOT NULL,
  `criticsId` int(8) NOT NULL,
  `comment_content` varchar(255) NOT NULL,
  `comment_time` varchar(255) NOT NULL,
  `comment_likes` int(10) DEFAULT NULL,
  PRIMARY KEY (`commentId`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userComment
-- ----------------------------
BEGIN;
INSERT INTO `userComment` VALUES (1, 14, 1, '这个还可以啊', '2018-07-16 08:14', 17);
INSERT INTO `userComment` VALUES (2, 14, 2, '我就是测一下评论', '2018.07.23 16:14', 0);
INSERT INTO `userComment` VALUES (3, 14, 2, '我就是再次测试一下评论', '2018.07.23 16:20', 0);
INSERT INTO `userComment` VALUES (4, 14, 2, '不管，继续测试', '2018.07.23 16:27', 0);
INSERT INTO `userComment` VALUES (5, 14, 2, '估计是最后一次测试了', '2018.07.23 16:28', 0);
INSERT INTO `userComment` VALUES (7, 14, 2, '女方家人\n俄方烦恼如风', '2018.07.23 17:32', 0);
INSERT INTO `userComment` VALUES (8, 20, 2, '沙发', '2018.07.24 11:34', 0);
INSERT INTO `userComment` VALUES (9, 15, 2, '沙发', '2018.07.25 16:59', 0);
COMMIT;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `userId` int(8) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `attentionCount` int(8) unsigned DEFAULT NULL,
  `fansCount` int(8) unsigned DEFAULT NULL,
  `articleCount` int(8) unsigned DEFAULT NULL,
  `words` int(8) unsigned DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `sex` int(8) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
BEGIN;
INSERT INTO `userinfo` VALUES (1, 'https://i.loli.net/2017/08/21/599a521472424.jpg', 99, 99, 99, 156300, 'root', 0);
INSERT INTO `userinfo` VALUES (2, 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532336898040&di=86307303feaff8edcbbb971f6f8923aa&imgtype=0&src=http%3A%2F%2Ftvax1.sinaimg.cn%2Fcrop.0.0.996.996.1024%2F005X7W89ly8fm6a9qh9noj30ro0ro0v4.jpg', 1000, 10000, 100000, 10000000, 'mory', 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
