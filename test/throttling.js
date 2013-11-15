var test = require('tap').test;
var throttle = require('../throttle');

test('change to server on 10th request', function (t) {
  req = {};
  throttle(req, {}, function(){}); //0
  t.equal("browser", req.render_mode);
  for (var i=1; i<=10; i++) {
    throttle(req, {}, function(){}); //1->10
  }
  t.equal("browser", req.render_mode);
  throttle(req, {}, function(){}); //11
  t.equal("server", req.render_mode);
  throttle(req, {}, function(){}); //12
  t.equal("server", req.render_mode);
  t.end();
});
