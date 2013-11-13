var handlebars = require("handlebars");
var fs = require('fs');
var express = require("express");
var Q = require('q'); // promises

var tpl_cache = {};
var tpl_partials_cache = {};

var app = express();
app.use(express.bodyParser());
app.use(express.compress());
app.get('/:section?', function (req, res) {
  if ( req.params.section === undefined ) {
    req.params.section = "home";
  }
  if ( req.headers['x-ajax'] ) {
    load_template(req.params.section).then(function (tpl) {
      res.send(tpl());
    }, function (error) {
      console.error(error);
      res.send(404, '<h1>404 not found</h1>');
    });
  } else {
    load_template("index").then(function (tpl) {
      return register_partial("content", req.params.section, tpl);
    }).then(function (tpl) {
      res.send(tpl());
    }, function (error) {
      console.error(error);
      res.send(404, '<h1>404 not found</h1>');
    });
  }
});
app.use(express.static(__dirname + '/public', { maxAge: 86400000 }));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
app.listen(3000);
console.log('Listening on port 3000');

function load_template(template) {
  var deferred = Q.defer();
  if ( tpl_cache[template] ) {
      deferred.resolve(tpl_cache[template]);
  } else {
    fs.readFile('public/tpl/'+template+'.tpl', 'utf8', function (err, data) {
      if ( err ) {
        deferred.reject(err);
      } else {
        tpl = handlebars.compile(data);
        tpl_cache[template] = tpl;
        deferred.resolve(tpl);        
      }
    });
  }
  return deferred.promise;
}

function register_partial(partial, template, pare) {
  var deferred = Q.defer();
  if ( tpl_partials_cache[partial] === template ) {
      deferred.resolve(pare);
  } else {
    load_template(template).then(function (tpl) {
      handlebars.registerPartial(partial, tpl);
      tpl_partials_cache[partial] = template;
      deferred.resolve(pare);
    }, function (error) {
      deferred.reject(error);
    });
  }
  return deferred.promise;
}
