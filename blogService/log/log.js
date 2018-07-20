var bunyan = require('bunyan');
var path = require('path');
var logger = bunyan.createLogger({
  name: 'website name',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  },
  streams: [
    {
      // stream: process.stdout
      type: 'rotating-file',
      level: 'info',
      path: path.join(__dirname, './logs', 'info.log'),
      period: '1d',   // daily rotation
      count: 7        // keep 7 back copies
    },
    {
      type: 'rotating-file',
      level: 'debug',
      path: path.join(__dirname, './logs', 'server.log'),
      period: '1d',   // daily rotation
      count: 7        // keep 7 back copies
    },
    {
      type: 'rotating-file',
      level: 'error',
      path: path.join(__dirname, './logs', 'error.log'),
      period: '1d',   // daily rotation
      count: 7        // keep 7 back copies
    }
  ]
});

module.exports = logger;
