$(document).ready(function() {
  // Enable ajax navigation if javascript is abailable and pushstate supported
  if ( typeof(window.history.pushState) == 'function' ) {
    // browser templates if javascript available
    App.render(App.render_mode);
  }
  // Send custom header so server responds only with partial content
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    jqXHR.setRequestHeader("x-ajax", true);
  });
});

window.App = {};
App.render_mode = "browser";
App.render = function(mode) {
  if ( mode === "server" ) {
    // restore default links, server rendering
    $("ul.nav li a").unbind('click');
  }
  if ( mode === "browser" ) {
    // ajax request, browser rendering
    $("ul.nav li a").click(function (evt) {
      evt.preventDefault();
      window.history.pushState(null, $(this).attr("href"), $(this).attr("href"));
      App.load_section(document.location.pathname);
    });
  }
};
App.load_section = function(section) {
  if ( section !== undefined ) {
    $.ajax({
      type : "GET",
      url : section,
      success : function(data) {
        var tpl = Handlebars.compile(data);
        $("#content").html(tpl({data: "from browser"}));
      }
    });
  }
};

window.onpopstate = function (event) {
  App.load_section(document.location.pathname);
};