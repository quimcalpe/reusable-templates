var test = require('tap').test;
var TPL = require('../lib/tpl-helpers');

test('load a template', function (t) {
  t.plan(1);
  TPL.load("about").then(function (tpl) {
    t.type(tpl, "function");
  }, function (error) {
    t.fail(error);
  });
});

test('load a raw template', function (t) {
  t.plan(1);
  TPL.load_raw("about").then(function (tpl) {
    t.type(tpl, "string");
  }, function (error) {
    t.fail(error);
  });
});

test('inexistent template throws error', function (t) {
  t.plan(1);
  TPL.load("nonono").then(function (tpl) {
    t.fail("should fail...");
  }, function (error) {
    t.pass("expected");
  });
});