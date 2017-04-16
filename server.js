var express = require('express');
var session = require('express-session');
var app = express();
 
app.use(express.static('public'));
app.use(session({
secret:'recommand 128 bytes random string',
cookie:{maxAge:60*1000}
}))

require('./route/fbRouter.js')(app);
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("http://%s:%s", host, port);
 
})