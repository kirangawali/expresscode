var express = require('express');
var app = express();


app.get('/first', function(req, res){
   res.send("First Hello world!");
});


app.listen(3000,function(){
console.log('Express Server listening at port 3000...');
}); 