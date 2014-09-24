var mongoose = require('mongoose')
  , fs = require('fs')
// Bootstrap db connection
// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } }
  mongoose.connect('mongodb://heroku:Idi1P9BmWC7H1o2QvMkBAdYeQ5sFM7cpuwBL55PQmm91ngH4axovJFnz-jMcFiApkKMkejoycFXKQ7CuXRvFZQ@kahana.mongohq.com:10007/app29942847
', options)
}
connect();
// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err)
})
// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect();
})
// Bootstrap models
var models_path = __dirname + '/../models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' +  file)
})