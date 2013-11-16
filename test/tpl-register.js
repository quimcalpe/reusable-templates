var test = require('tap').test;
var TPL = require('../lib/tpl-helpers');

test('register a partial', function (t) {
  t.plan(1);
  TPL.register_partial("content", "about").then(function (){
    t.pass("registered!");
  }, function (error) {
    t.fail(error);
  });
});

test('inexistent partial throws error', function (t) {
  t.plan(1);
  TPL.register_partial("content", "nonono").then(function (){
    t.fail("should fail...");
  }, function (error) {
    t.pass("expected");
  });
});