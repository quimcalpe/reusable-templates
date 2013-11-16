var test = require('tap').test;
var throttle = require('../throttle');

test('change to server on 10th request', function (t) {
  req = {};
  throttle(req, {}, function(){}); //0
  t.equal(req.render_mode, "browser");
  for (var i=1; i<=10; i++) {
    throttle(req, {}, function(){}); //1->10
  }
  t.equal(req.render_mode, "browser");
  throttle(req, {}, function(){}); //11
  t.equal(req.render_mode, "server");
  throttle(req, {}, function(){}); //12
  t.equal(req.render_mode, "server");
  t.end();
});
