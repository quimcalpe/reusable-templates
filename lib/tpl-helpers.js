var handlebars = require("handlebars");
var fs = require('fs');
var Q = require('q'); // promises

var tpl_cache = {};
var tpl_partials_cache = {};

function load(template, no_cache) {
  var deferred = Q.defer();
  if ( no_cache !== true && tpl_cache[template] ) {
    deferred.resolve(tpl_cache[template]);
  } else {
    fs.readFile(__dirname + '/../templates/'+template+'.tpl', 'utf8', function (err, data) {
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

function register_partial(partial, template, no_cache) {
  var deferred = Q.defer();
  if ( no_cache !== true && tpl_partials_cache[partial] === template ) {
    deferred.resolve(true);
  } else {
    load(template).then(function (tpl) {
      handlebars.registerPartial(partial, tpl);
      tpl_partials_cache[partial] = template;
      deferred.resolve(true);
    }, function (error) {
      deferred.reject(error);
    });
  }
  return deferred.promise;
}

module.exports = {
  load : load,
  register_partial : register_partial
};