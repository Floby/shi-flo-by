var util = require('util');
var ws = require('ws');
var DuplexStream = require('stream').Duplex;

var Stream = module.exports = function Stream(uri) {
  if(!(this instanceof Stream)) return new Stream(uri);
  DuplexStream.apply(this);
  this.setEncoding('utf8');
  this._connected = false;
  this._writeQueue = [];

  uri = uri + '/websocket';
  this._ws = new ws(uri);
  var self = this;
  this._ws.on('open', function() {
    self._connected = true;
    self.emit('open');
    self._flushQueue();
  });
  this._ws.on('message', function(message) {
    self.push(message.toString());
  });
  this._ws.on('close', function () {
    self.push(null);
  });
  this.on('finish', function() {
    self._ws.close();
  });
};
util.inherits(Stream, DuplexStream);

Stream.prototype._write = function (chunk, encoding, callback) {
  if(!this._connected) {
    this._writeQueue.push(chunk.toString());
    return callback();
  }
  this._ws.send(chunk.toString());
  callback();
};

Stream.prototype._flushQueue = function () {
  var message;
  while(message = this._writeQueue.shift()) {
    this._ws.send(message);
  }
};

Stream.prototype._read = function () {
};
