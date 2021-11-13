var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.sendFile(__dirname + '/public/dashboard.html');
});

app.listen(3000);