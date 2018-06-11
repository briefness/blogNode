/* 导入mysql模块 */
var mysql = require('mysql');
var dbconfig = require('./DBConfig');
var pool = mysql.createPool(dbconfig.mysql);     // 使用DBConfig.js的配置信息创建一个MySQL连接池

var query = function(sql, options, callback){
    pool.getConnection(function(err, conn){
        if(err){
            callback(err, null, null);
        }else{
            conn.query(sql, options, function(err, results, fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err, results, fields);
            });
        }
    });
};

module.exports = query;
