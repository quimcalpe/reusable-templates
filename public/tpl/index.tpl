<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Reusable Templates</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/base.css">
  </head>
  <body>
    <ul class="nav">
      <li class="home"><a href="./">Home</a></li>
      <li><a href="about">About</a></li>
    </ul>
    <div id="content">{{>content content}}</div>
    <script type="text/javascript" src="js/vendor/jquery.min.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
  </body>
</html>