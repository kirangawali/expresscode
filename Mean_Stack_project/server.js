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
    "GET, POST, PATCH, DELETE, OPTIONS,PUT"
  );
  next();
});

app.use('/apps',appRoute);

app.get('/first', function(req, res){
   res.send("First Hello world!");
});


//Mongo DB Connection Set Up 


const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);




mongoose.connect(
				'mongodb+srv://kiran:kiran@cluster0-ucd3n.mongodb.net/node-angular'
				, { useUnifiedTopology: true,  useNewUrlParser: true} 
		  ).then( () => {
							console.log("Connected to MOngo DB  Database!");
						}
				).catch(
							(err) => {
								console.log("Connection failed!"+err);
							  }
						);



app.listen(3000,function(){
console.log('Express Server listening at port 3000...');
}); 