var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
var query = require('../DB/UserSql');
var logger = require('../log/log');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, path.join(__dirname , '../public/resource'));
  },
  filename: function (req, file, cb){
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
}).single('imgFile');

// upload image
router.post('/upload_images', function (req, res) {
  upload(req, res, function (err) {
    logger.info('-----------------开始上传------------------');
    if (err) {
      logger.error(err.message);
      res.writeHead(404);
      res.end(err.message);
      return
    }
    try {
      let url = 'http://' + req.headers.host + '/resource/' + req.file.originalname
      res.writeHead(200);
      res.end(JSON.stringify({'url': url}));
      logger.info('图片链接：', url);
      logger.info('-----------------上传完成------------------');
    }
    catch(err) {
      logger.error(err.message);
      logger.info(err.message);
      logger.info('-----------------上传失败------------------');
    }
  })
})


// login
router.post('/loginVerify', function(req, res, next) {
  logger.info('开始登陆');
  query('select * from user where username=? and password=?', [req.body.username, req.body.password], function(err, results, fields){
    if (err) {
      logger.error(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    try {
      res.writeHead(200);
      if (results && results.length > 0) {
        let data = { 'username': results[0].username, 'userId': results[0].userId, 'token': results[0].token};
        res.end(JSON.stringify({'data': data}));
      } else {
        res.end(JSON.stringify({'message': '账号或密码不正确'}));
      }
      logger.info('返回信息：', data);
      logger.info('登陆完成');
    } catch (e) {
      logger.error(e.message);
      logger.info(e.message);
      logger.info('登陆失败');
    }
  })
});
// get userInfo
router.post('/get_userInfo', function(req, res, next) {
  logger,info('开始获取个人信息');
  query('select * from userInfo where userId=?', [req.body.userId], function(err, results, fields){
    if (err) {
      logger.error(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    try {
      res.writeHead(200);
      if (results) {
        let data = {
          'avatar': results[0].avatar,
          'articleCount': results[0].articleCount,
          'fansCount': results[0].fansCount,
          'attentionCount': results[0].attentionCount,
          'words': results[0].words
        };
        logger.info('个人信息：', data);
        res.end(JSON.stringify({'data': data}));
      }
      logger.info('获取个人信息完成');
    } catch (e) {
      logger.error(e.message);
      logger.info(e.message);
      logger.info('获取个人信息失败');
    }
  })
});

// get blogList
router.get('/get_blogList', function(req, res, next) {
  logger.info('开始获取博客列表');
  query('select * from article, user where user.userId=article.userId', [], function(err, results, fields){
    if (err) {
      logger.error(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    try {
      res.writeHead(200);
      if (results && results.length > 0) {
        let blogList = [];
        results.forEach((currentValue, index) => {
          let data = {
            'articleId': currentValue.articleId,
            'avatar': currentValue.avatar,
            'userName': currentValue.username,
            'publishTime': currentValue.release_time,
            'blogTitle': currentValue.title,
            'blogContent': currentValue.thumbnail_article,
            'relatedImg': currentValue.related_img,
            'pageView': currentValue.preview_count,
            'reply': currentValue.commnet_count,
            'like': currentValue.like_count
          };
          let content = currentValue.thumbnail_article.toString();
          if (content.length > 116) {
            data.blogContent = content.substring(0, 116) + '...';
          }
          blogList.push(data);
        })
        logger.info('博客列表：', blogList);
        res.end(JSON.stringify({'data': blogList}));
      } else {
        logger.info('博客列表：', '当前并无文章');
        res.end(JSON.stringify({'message': '当前并无文章'}));
      }
      logger.info('获取博客列表完成');
    } catch (e) {
      logger.error(e.message);
      logger.info(e.message);
      logger.info('获取博客列表失败');
    }
  })
});

// publish blog
router.post('/publish_blog', function(req, res, next) {
  logger.info('开始发布');
  let sql = 'INSERT INTO article(userId,title,content,related_img,thumbnail_article,release_time,preview_count,commnet_count,like_count) VALUES(?,?,?,?,?,?,?,?,?)';
  let data = [req.body.userId, req.body.title, req.body.content, req.body.relatedImg, req.body.thumbnailArticle, req.body.publishTime, 0, 0, 0];
  query(sql, data, function(err, results, fields){
    if (err) {
      logger.error(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    try {
      res.writeHead(200);
      let message = {'code': 2000000, 'message': '发布成功'};
      if (!results) {
        message = {'code': 2000001, 'message': '发布失败'};;
      }
      res.end(JSON.stringify(message));
      logger.info(message.message)
    } catch (e) {
      logger.error(e.message);
      logger.info(e.message);
      logger.info('发布失败')
    }
  })
});

// search blog
router.post('/blog/search', function(req, res, next) {
  logger.info('开始搜索文章');
  let keywords = req.body.keywords.split(' ');
  let sqlStn = "select * from article, user where user.userId=article.userId ";
  keywords.forEach((key, index) => {
    if (index === 0) {
      sqlStn += "and thumbnail_article like '%"+ key +"%' ";
    } else {
      sqlStn += "or thumbnail_article like '%"+ key +"%' ";
    }
  })
  query(sqlStn, [], function(err, results, fields){
    if (err) {
      logger.info(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    try {
      res.writeHead(200);
      if (results && results.length > 0) {
        let blogList = [];
        results.forEach((currentValue, index) => {
          let data = {
            'articleId': currentValue.articleId,
            'avatar': currentValue.avatar,
            'userName': currentValue.username,
            'publishTime': currentValue.release_time,
            'blogTitle': currentValue.title,
            'blogContent': currentValue.thumbnail_article,
            'relatedImg': currentValue.related_img,
            'pageView': currentValue.preview_count,
            'reply': currentValue.commnet_count,
            'like': currentValue.like_count
          };
          let content = currentValue.thumbnail_article.toString();
          if (content.length > 116) {
            data.blogContent = content.substring(0, 116) + '...';
          }
          blogList.push(data);
        })
        logger.info('博客列表：', blogList)
        res.end(JSON.stringify({'data': blogList}));
      } else {
        res.end(JSON.stringify({'message': '当前并无文章'}));
        logger.info('当前并无文章');
      }
      logger.info('搜索完成');
    } catch (e) {
      logger.error(e.message);
      logger.info(e.message);
      logger.info('搜索博客失败');
    }
  })
});

module.exports = router;
