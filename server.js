var express = require("express");
var TPL = require("./lib/tpl-helpers");
var throttle = require("./lib/throttle");

var app = express();
app.use(express.bodyParser());
app.use(express.compress());
app.use(throttle);
app.get('/:section?', function (req, res) {
  if ( req.params.section === undefined ) {
    req.params.section = "home";
  }
  if ( req.headers['x-ajax'] ) {
    TPL.load(req.params.section).then(function (tpl) {
      res.send(tpl({name: "from browser"}));
    }, function (error) {
      console.error(error);
      res.send(404, '<h1>404 not found</h1>');
    });
  } else {
    TPL.register_partial("content", req.params.section).then(function (){
      return TPL.load("index");
    }).then(function (tpl) {
      res.send(tpl({
        content : {name: "from server"},
        render_mode: req.render_mode || "browser"
      }));
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
