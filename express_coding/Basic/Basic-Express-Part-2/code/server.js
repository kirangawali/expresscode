var express = require('express');
var app = express();


app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/first', function(req, res){
   res.send("First Hello world!");
});

app.get('/second', function(req, res){
   res.send("Second Hello world!");
});

app.listen(3000,function(){
console.log('Express Server listening at port 3000...');
}); 