var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/loginVerify', function(req, res, next) {
  console.log(req.body);
  res.json({'code': 200, 'res': '登陆成功'});
});

module.exports = router;
