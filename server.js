// source code of our web server.

// importing some software packages. these are very common labraries
var express = require('express'); // used to create web server so that we need not to learn to listen on port or  handling http connections. 
var morgan = require('morgan'); //used to help us output logs of server that we know what request comming to server to a server and how we handle those.
var path = require('path');

var app = express();
app.use(morgan('combined'));

// handling specific url
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

// handling specific url
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

// handling specific url
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

