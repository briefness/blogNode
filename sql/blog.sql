/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50162
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50162
File Encoding         : 65001

Date: 2018-07-18 11:34:38
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('14', '文章标题', '<p>限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示</p>\n', '1', '2018.07.17 16:59', '0', '0', '0', 'http://upload-images.jianshu.io/upload_images/2239034-051aa6a34c3c1100.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240', '限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示');
INSERT INTO `article` VALUES ('15', '文章标题', '<p>限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示</p>\n', '1', '2018.07.17 17:00', '0', '0', '0', '', '限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示这里是文章的内容，限制显示字数，超出部分显示');

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
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'root', 'e10adc3949ba59abbe56e057f20f883e', 'eyJhbGciOiJIUzI1NiIsImV4cCI6MTUwOTY5MjU5OSwiaWF0IjoxNTA5Njg2NTk5fQ.eyJpZCI6bnVsbH0.ZQcw3Sas-TVW4Dso8ok2dfbXLs-to65n84ihxOXiWLY', 'https://i.loli.net/2017/08/21/599a521472424.jpg');

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
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('1', 'https://i.loli.net/2017/08/21/599a521472424.jpg', '99', '99', '99', '156300');

-- ----------------------------
-- Table structure for user_comment
-- ----------------------------
DROP TABLE IF EXISTS `user_comment`;
CREATE TABLE `user_comment` (
  `commentId` int(8) NOT NULL AUTO_INCREMENT,
  `articleId` int(8) NOT NULL,
  `criticsId` int(8) NOT NULL,
  `comment_content` varchar(255) NOT NULL,
  `comment_time` date NOT NULL,
  PRIMARY KEY (`commentId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_comment
-- ----------------------------
INSERT INTO `user_comment` VALUES ('1', '1', '1', '这个还可以啊', '2018-07-16');
