exports.get = function (req, res, next) {
  res.send(200);
};
exports.create = function (req, res, next) {
  res.setHeader('Location', '/game/abcd');
  res.send(201);
};
