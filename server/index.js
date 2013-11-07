var initiliazer = module.exports = require('./lib/application');

if (!module.parent) {
  var argv = require('optimist')
    .default('port', 8124)
    .default('base', 'tmp/public')
    .default('database', process.env.MONGOLAB_URI || 'mongodb://localhost/octo-fu-mi_test')
    .describe('port', 'Run server on this port')
    .argv;
  var server = initiliazer(argv);
  server.listen(argv.port, function () {
    console.log('Server listening on http://localhost:'+argv.port+'/');
  });
}
