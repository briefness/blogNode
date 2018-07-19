var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
var query = require('../DB/UserSql');

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
    console.log('-----------------开始上传------------------');
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end(err.message);
      return
    }
    let url = 'http://' + req.headers.host + '/resource/' + req.file.originalname
    res.writeHead(200);
    res.end(JSON.stringify({'url': url}));
    console.log('-----------------上传完成------------------');
    console.log('-----------------文件信息: ');
    console.log(req.file ? req.file : '文件错误');
  })
})


// login
router.post('/loginVerify', function(req, res, next) {
  query('select * from user where username=? and password=?', [req.body.username, req.body.password], function(err, results, fields){
    console.log('-----------------开始登陆------------------');
    if (err) {
      console.log(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    res.writeHead(200);
    if (results) {
      let data = { 'username': results[0].username, 'userId': results[0].userId, 'token': results[0].token};
      res.end(JSON.stringify({'data': data}));
    } else {
      res.end(JSON.stringify({'message': '账号或密码不正确'}));
    }
    console.log('-----------------登陆完成------------------');
    console.log('-----------------登陆信息: ');
    console.log(results ? results : '账号或密码不正确');
  })
});
// get userInfo
router.post('/get_userInfo', function(req, res, next) {
  query('select * from userInfo where userId=?', [req.body.userId], function(err, results, fields){
    console.log('-----------------开始获取个人信息------------------');
    if (err) {
      console.log(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    res.writeHead(200);
    if (results) {
      let data = {
        'avatar': results[0].avatar,
        'articleCount': results[0].articleCount,
        'fansCount': results[0].fansCount,
        'attentionCount': results[0].attentionCount,
        'words': results[0].words
      };
      res.end(JSON.stringify({'data': data}));
    }
    console.log('-----------------获取个人信息完成------------------');
    console.log('-----------------个人信息: ' );
    console.log(results ? results : '查无此人');
  })
});

// get blogList
router.get('/get_blogList', function(req, res, next) {
  query('select * from article, user where user.userId=article.userId', function(err, results, fields){
    console.log('-----------------开始获取博客列表------------------');
    if (err) {
      console.log(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    res.writeHead(200);
    if (results && results.length > 0) {
      let logList = [];
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
        logList.push(data);
      })
      res.end(JSON.stringify({'data': logList}));
    } else {
      res.end(JSON.stringify({'message': '当前并无文章'}));
    }
    console.log('-----------------获取博客列表完成------------------');
    console.log('-----------------博客列表: ' );
    console.log(results ? results : '当前并无文章');
  })
});

// publish blog
router.post('/publish_blog', function(req, res, next) {
  console.log(req.body);
  let sql = 'INSERT INTO article(userId,title,content,related_img,thumbnail_article,release_time,preview_count,commnet_count,like_count) VALUES(?,?,?,?,?,?,?,?,?)';
  let data = [req.body.userId, req.body.title, req.body.content, req.body.relatedImg, req.body.thumbnailArticle, req.body.publishTime, 0, 0, 0];
  query(sql, data, function(err, results, fields){
    console.log('-----------------开始发布------------------');
    if (err) {
      console.log(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    res.writeHead(200);
    let message = {'code': 2000000, 'message': '发布成功'};
    if (!results) {
      message = {'code': 2000001, 'message': '发布失败'};;
    }
    res.end(JSON.stringify(message));
    console.log('-----------------发布完成------------------');
    console.log('-----------------发布状态: ');
    console.log(message.message);
  })
});

module.exports = router;
