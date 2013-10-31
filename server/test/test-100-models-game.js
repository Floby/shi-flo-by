var mongoose = require('mongoose');

describe('Model game', function () {
  before(function (done) {
    mongoose.connect('mongodb://localhost/octo-fu-mi_testing', done);
  });
  after(function (done) {
    mongoose.connection.close(done);
  });

  it('exists', function () {

  })
})
