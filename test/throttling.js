var test = require('tap').test;
var throttle = require('../throttle');

test('change to server on 10th request', function (t) {
  var req = {};
  var next = function(){};
  throttle(req, {}, next); //0
  t.equal(req.render_mode, "browser");
  for (var i=1; i<=10; i++) {
    throttle(req, {}, next); //1->10
  }
  t.equal(req.render_mode, "browser");
  throttle(req, {}, next); //11
  t.equal(req.render_mode, "server");
  throttle(req, {}, next); //12
  t.equal(req.render_mode, "server");
  t.end();
});
