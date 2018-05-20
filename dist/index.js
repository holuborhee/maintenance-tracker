'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.route('/users/requests').get(function (req, res) {
  return res.send({ 'msg': 'I give all requests for user' });
}).post(function (req, res) {
  return res.send({ 'msg': 'I create a new request' });
});

app.route('/users/requests/:requestId').get(function (req, res) {
  return res.send({ 'msg': 'I give full detail about this request' });
}).put(function (req, res) {
  return res.send({ 'msg': 'I modify this request' });
});

app.use(function (req, res, next) {
  res.status(404).send({ 'msg': 'This request does not match any on this server' });
});

app.listen(3000, function () {
  return console.log('Example app listening on port 3000!');
});