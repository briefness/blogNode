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
        let data = {
          'avatar': results[0].avatar,
          'username': results[0].username,
          'userId': results[0].userId,
          'token': results[0].token,
          'permissions': results[0].permissions
        };
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
  logger.info('开始获取个人信息');
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


var getBlogList = function(err, results, fields, res, req) {
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
          'publishTime': currentValue.release_time,
          'blogTitle': currentValue.title,
          'blogContent': currentValue.thumbnail_article,
          'relatedImg': currentValue.related_img,
          'pageView': currentValue.preview_count,
          'reply': currentValue.commnet_count,
          'like': currentValue.like_count
        };
        if (!req.body.userId) {
          data.avatar = currentValue.avatar
          data.userName = currentValue.userName
        }
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
}
// get blogList
router.post('/get_blogList', function(req, res, next) {
  logger.info('开始获取博客列表');
  if (!req.body.userId) {
    query('select * from article, userInfo where userInfo.userId=article.userId', [], function(err, results, fields) {
      getBlogList(err, results, fields, res, req)
    })
  } else {
    query('select * from article where userId=?', [req.body.userId], function(err, results, fields){
      getBlogList(err, results, fields, res, req)
    })
  }
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
      logger.info(results);
      logger.info(message.message);
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

// get blog detail
router.post('/blog/blog_detail', function(req, res, next) {
  logger.info('开始获取博客详情');
  query('select * from article, userInfo where userInfo.userId=article.userId and articleId=?', [req.body.articleId], function(err, results, fields){
    if (err) {
      logger.error(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    try {
      let data = {};
      if (results) {
        data = {
          'blogContentHtml': results[0].content,
          'title': results[0].title,
          'userName': results[0].username,
          'publishTime': results[0].release_time,
          'sex': results[0].sex,
          'avatar': results[0].avatar,
          'likes': results[0].like_count
        };
      }
      query('select state from likeArticle where articleId=? and userId=?', [req.body.articleId, req.body.userId], function(err, results, fields){
        if (err) {
          logger.error(err.message);
          res.writeHead(404);
          res.end(err.message);
          return;
        }
        try {
          res.writeHead(200);
          if (results && results.length > 0) {
            data.state = results[0].state;
          } else {
            data.state = 0;
          }
          logger.info('博客详情信息：', data);
          res.end(JSON.stringify({'data': data}));
        } catch (e) {
          logger.error(e.message);
          logger.info(e.message);
          logger.info('获取博客详情失败');
        }
      })
      logger.info('获取博客详情完成');
    } catch (e) {
      logger.error(e.message);
      logger.info(e.message);
      logger.info('获取博客详情失败');
    }
  })
});

// get publish comment
router.post('/blog/publish_comment', function(req, res, next) {
  logger.info('开始发表博客评论');
  let reqData = [req.body.articleId, req.body.criticsId, req.body.commentContent, req.body.commentTime, 0]
  query('INSERT INTO userComment(articleId,criticsId,comment_content,comment_time,comment_likes) VALUES(?,?,?,?,?)', reqData, function(err, results, fields){
    if (err) {
      logger.error(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    try {
      res.writeHead(200);
      if (results) {
        res.end(JSON.stringify({'message': '发表成功', 'state': true}));
      } else {
        res.end(JSON.stringify({'message': '发表失败', 'state': false}));
      }
      logger.info('发布博客评论信息：', results);
      logger.info('发表博客评论完成');
    } catch (e) {
      logger.error(e.message);
      logger.info(e.message);
      logger.info('发表博客评论失败');
    }
  })
});

// get blog comment
router.post('/blog/blog_comment', function(req, res, next) {
  logger.info('开始获取博客评论');
  query('select * from userInfo, userComment where userInfo.userId=userComment.criticsId and articleId=?', [req.body.articleId], function(err, results, fields){

    if (err) {
      logger.error(err.message);
      res.writeHead(404);
      res.end(err.message);
      return;
    }
    try {
      let data = {};
      let commentList = [];
      if (results) {
        results.forEach((currentValue, index) => {
          data = {
            'commentId': currentValue.commentId,
            'comment': currentValue.comment_content,
            'userName': currentValue.username,
            'publishTime': currentValue.comment_time,
            'avatar': currentValue.avatar,
            'likes': currentValue.comment_likes,
            'isLike': true
          };
          commentList.unshift(data);
        })
      }
      query('select * from likeComment where userId=?', [req.body.userId], function(err, results, fields){
        if (err) {
          logger.error(err.message);
          res.writeHead(404);
          res.end(err.message);
          return;
        }
        try {
          res.writeHead(200);
          if (results && results.length > 0) {
            commentList.forEach((com, index) => {
              results.forEach((likeC) => {
                if (likeC.commentId === com.commentId) {
                  com.isLike = !likeC.state;
                }
              })
            })
          }
          logger.info('博客评论信息：', commentList);
          res.end(JSON.stringify({'data': commentList}));
        } catch (e) {
          logger.error(e.message);
          logger.info(e.message);
          logger.info('获取博客评论失败');
        }
      })
      logger.info('获取博客评论完成');
    } catch (e) {
      logger.error(e.message);
      logger.info(e.message);
      logger.info('获取博客评论失败');
    }
  })
});

// blog like
var likeBlog = function(err, results, fields, res) {
  if (err) {
    logger.error(err.message);
    res.writeHead(404);
    res.end(err.message);
    return;
  }
  try {
    res.writeHead(200);
    if (results) {
      logger.info('博客点赞信息：', results);
      res.end(JSON.stringify({'message': '点赞成功'}));
    }
    logger.info('获取博客点赞完成');
  } catch (e) {
    logger.error(e.message);
    logger.info(e.message);
    logger.info('获取博客点赞失败');
  }
};

router.post('/blog/blog_like', function(req, res, next) {
  logger.info('开始博客点赞');
  query('select state from likeArticle where articleId=? and userId=?', [req.body.articleId, req.body.userId], function(err, results, fields){
    if (results && results.length > 0) {
      let updateData = [req.body.state, req.body.articleId, req.body.userId];
      let updateLikeCountSql = 'update article set like_count=like_count+1 where articleId=?';
      if (!req.body.state) {
        updateLikeCountSql = 'update article set like_count=like_count-1 where articleId=?';
      }
      query('update likeArticle set state=? where articleId=? and userId=?', updateData, function(){
        query(updateLikeCountSql, [req.body.articleId], function(err, results, fields){
          likeBlog(err, results, fields, res);
        })
      })
    } else {
      let insertData = [req.body.articleId, req.body.userId, req.body.state];
      query('INSERT INTO likeArticle(articleId,userId,state) VALUES(?,?,?)', insertData, function(){
        query('update article set like_count=like_count+1 where articleId=?', [req.body.articleId], function(err, results, fields){
          likeBlog(err, results, fields, res);
        })
      })
    }
  })
});

// comment like
var likeComment = function(err, results, fields, res) {
  if (err) {
    logger.error(err.message);
    res.writeHead(404);
    res.end(err.message);
    return;
  }
  try {
    res.writeHead(200);
    if (results) {
      logger.info('评论点赞信息：', results);
      res.end(JSON.stringify({'message': '点赞成功'}));
    }
    logger.info('获取评论点赞完成');
  } catch (e) {
    logger.error(e.message);
    logger.info(e.message);
    logger.info('获取评论点赞失败');
  }
};

router.post('/blog/comment_like', function(req, res, next) {
  logger.info('开始评论点赞');
  query('select state from likeComment where commentId=? and userId=?', [req.body.commentId, req.body.userId], function(err, results, fields){
    if (results && results.length > 0) {
      let updateData = [req.body.state, req.body.commentId, req.body.userId];
      let updateCommentCountSql = 'update userComment set comment_likes=comment_likes+1 where commentId=?';
      if (!req.body.state) {
        updateCommentCountSql = 'update userComment set comment_likes=comment_likes-1 where commentId=?';
      }
      query('update likeComment set state=? where commentId=? and userId=?', updateData, function(){
        query(updateCommentCountSql, [req.body.commentId], function(err, results, fields){
          likeComment(err, results, fields, res);
        })
      })
    } else {
      let insertData = [req.body.commentId, req.body.userId, req.body.state];
      query('INSERT INTO likeComment(commentId,userId,state) VALUES(?,?,?)', insertData, function(){
        query('update userComment set comment_likes=comment_likes+1 where commentId=?', [req.body.commentId], function(err, results, fields){
          likeComment(err, results, fields, res);
        })
      })
    }
  })
});

module.exports = router;
