var handlebars = require("handlebars");
var fs = require('fs');
var express = require("express");
var Q = require('q'); // promises

var tpl_cache = {};

var app = express();
app.use(express.bodyParser());
app.use(express.compress());
app.use(express.static(__dirname + '/public', { maxAge: 86400000 }));
app.get('/browser', function (req, res) {
  res.send('browser');
});
app.get('/server/:nombre', function (req, res) {
  load_template("hola").then(function (tpl) {
    res.send('<h1>sever generated</h1>'+tpl({name: req.params.nombre}));
  });
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
app.listen(3000);
console.log('Listening on port 3000');

function load_template(nombre) {
  var deferred = Q.defer();
  if ( tpl_cache[nombre] ) {
      console.log(nombre+" from cache!");
      deferred.resolve(tpl_cache[nombre]);
  } else {
    fs.readFile('public/tpl/'+nombre+'.tpl', 'utf8', function (err, data) {
      if (err) deferred.reject(err);
      tpl = handlebars.compile(data);
      tpl_cache[nombre] = tpl;
      console.log(nombre+" from disk");
      deferred.resolve(tpl);
    });
  }
  return deferred.promise;
}

