var express = require('express');
var router = express.Router();
var query = require('../DB/UserSql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/loginVerify', function(req, res, next) {
  query('select * from user where username=?', [req.body.username], function(err, results, fields){
    if (err) {
      console.log(err.message);
      return;
    }
    if (results && results.length > 0) {
      res.json({'code': 200, 'res': '登陆成功'});
    } else {
      res.json({'code': 201, 'res': '账号或密码不正确'});
    }
  })
});

module.exports = router;
