$(document).ready(function() {
  // Enable ajax navigation if javascript is abailable and pushstate supported
  if ( typeof(window.history.pushState) == 'function' ) {
    $("ul.nav li a").click(function (evt) {
      evt.preventDefault();
      window.history.pushState(null, $(this).attr("href"), $(this).attr("href"));
      App.load_section(document.location.pathname);
    });

  }
  // Send custom header so server responds only with partial content
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
      success : function(data) {
        $("#content").html(data);
      }
    });
  }
};

window.onpopstate = function (event) {
  App.load_section(document.location.pathname);
};