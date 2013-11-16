// Worst throttling algorithm ever...

var count = 0;

module.exports = function (req, res, next) {
  // simulate server load, on 10th request, change to server rendering
  if ( count > 10 ) {
    req.render_mode = "server";
  } else {
    req.render_mode = "browser";
  }
  count++;
  next();
};