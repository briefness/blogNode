var express = require('express');
var router = express.Router();
var query = require('../DB/UserSql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// login
router.post('/loginVerify', function(req, res, next) {
  query('select * from user where username=?', [req.body.username], function(err, results, fields){
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

module.exports = router;
