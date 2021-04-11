var express = require('express');
var app = express();

const appRoute = require("./routes/application");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/apps',appRoute);

app.get('/first', function(req, res){
   res.send("First Hello world!");
});


app.listen(3000,function(){
console.log('Express Server listening at port 3000...');
}); 