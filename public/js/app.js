$(document).ready(function() {
  // Enable ajax navigation if javascript is abailable and pushstate supported
  if ( typeof(window.history.pushState) == 'function' ) {
    $("ul.nav li a").click(function (evt) {
      evt.preventDefault();
      window.history.pushState(null, "Title", $(this).attr("href"));
      App.load_section(document.location.pathname);
    });

  }
  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    jqXHR.setRequestHeader("x-ajax", true);
  });
});

window.App = {};
App.load_section = function(section) {
  if ( section !== undefined ) {
    $.ajax({
      dataType : "html",
      type : "GET",
      url : section,
      success : function(respuesta) {
        $("#content").html(respuesta);
      }
    });
  }
};

window.onpopstate = function (event) {
  // see what is available in the event object
  App.load_section(document.location.pathname);
};