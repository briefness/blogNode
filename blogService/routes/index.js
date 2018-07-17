var express = require('express');
var router = express.Router();
var query = require('../DB/UserSql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// login
router.post('/loginVerify', function(req, res, next) {
  query('select * from user where username=? and password=?', [req.body.username, req.body.password], function(err, results, fields){
    if (err) {
      console.log(err.message);
      return;
    }
    if (results && results.length > 0) {
      console.log(results[0].userId);
      let data = { 'username': results[0].username, 'userId': results[0].userId, 'token': results[0].token};
      res.json({'code': 200, 'data': data});
    } else {
      res.json({'code': 201, 'res': '账号或密码不正确'});
    }
  })
});
// get userInfo
router.post('/get_userInfo', function(req, res, next) {
  query('select * from userInfo where userId=?', [req.body.userId], function(err, results, fields){
    if (err) {
      console.log(err.message);
      return;
    }
    if (results && results.length > 0) {
      let data = {
        'avatar': results[0].avatar,
        'articleCount': results[0].articleCount,
        'fansCount': results[0].fansCount,
        'attentionCount': results[0].attentionCount,
        'words': results[0].words
      };
      res.json({'code': 200, 'data': data});
    } else {
      res.json({'code': 201, 'res': '获取用户信息失败'});
    }
  })
});

// get blogList
router.get('/get_blogList', function(req, res, next) {
  query('select * from article, user where user.userId=article.userId', function(err, results, fields){
    if (err) {
      console.log(err.message);
      return;
    }
    if (results && results.length > 0) {
      let logList = [];
      results.forEach((currentValue, index) => {

        console.log(currentValue);
        let data = {
          'articleId': currentValue.articleId,
          'avatar': currentValue.avatar,
          'userName': currentValue.username,
          'publishTime': currentValue.release_time,
          'blogTitle': currentValue.title,
          'relatedImg': currentValue.related_img,
          'pageView': currentValue.preview_count,
          'reply': currentValue.commnet_count,
          'like': currentValue.like_count
        };
        let content = currentValue.thumbnail_article.toString();
        data.blogContent = content.substring(0, 116) + '...';
        logList.push(data);
      })
      res.json({'code': 200, 'data': logList});
    } else {
      res.json({'code': 201, 'res': '获取博客列表失败'});
    }
  })
});

// publish blog
router.post('/publish_blog', function(req, res, next) {
  console.log(req.body);
  let sql = 'INSERT INTO article(userId,title,content,related_img,thumbnail_article,release_time,preview_count,commnet_count,like_count) VALUES(?,?,?,?,?,?,?,?,?)';
  let data = [req.body.userId, req.body.title, req.body.content, req.body.relatedImg, req.body.thumbnailArticle, req.body.publishTime, 0, 0, 0];
  query(sql, data, function(err, results, fields){
    if (err) {
      console.log(err.message);
      return;
    }
    if (results) {
      res.json({'code': 200, 'message': '发布成功'});
    } else {
      res.json({'code': 201, 'message': '发布失败'});
    }
  })
});

module.exports = router;
