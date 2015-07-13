var express = require('express');

module.exports = function(app, io) {

  // Set .html as the default template extension
  app.set('view engine', 'html');

  // Initialize the ejs template engine
  app.engine('html', require('ejs').renderFile);

  // Tell express where it can find the templates
  app.set('views', __dirname + '/views');

  
  app.use(express.static(__dirname + '/public'));

};