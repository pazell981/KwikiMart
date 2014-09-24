var express = require('express.io');
var http = require('http');
var path = require('path');
var multer = require('multer');  //needed to allow node to see files within form data
var moment = require('moment');
var angularMoment = ('angularMoment');
var app = express().http().io();

// configuring our environments
app.configure(function(){
  app.use(express.cookieParser());  
  app.use(express.json());    //for handling post data
  app.use(express.urlencoded());    //for handling post data
  app.use(express.static(path.join(__dirname, 'public'))); //for handling static contents
  app.use(express.session({secret: 'monkey'})); //for using sessions
  app.use(multer({dest: "./public/images/"}))//where temp file will be held
  app.set('view engine', 'ejs');

});
//we're going to have /routes/index.js handle all of our routing
var mongoose = require('./config/mongoose.js');
var routes = require('./config/routes.js')(app);

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
