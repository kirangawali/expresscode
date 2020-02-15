var express = require('express');

var router = express.Router();

const User  = require("../models/user");

var bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");

router.get('/user',(req, res, next) => {
	
	  res.send("Hello Login - User!");
	  
	  next();
	
});


router.post("/signup" , (req,res,next) => {
	console.log(' signup method .. 1');
	
	bcrypt.hash(req.body.password, 10).
	then( 
	hash =>
	{
		console.log(' signup method hash : '+ hash);
		
		const user = new User({
			userName: req.body.userName,
			loginName: req.body.loginName,
			password: hash,
			email: req.body.email,
			userType: req.body.userType,
			contactNumber: req.body.contactNumber,
			address: req.body.address 
   
  });
  console.log(' signup method  occured.. 2');
  user.save().
  then (result => 
  {
	    console.log(' signup method  --- Start 3');
		res.status(201).json({
									message: "User added successfully",
									result : result
							});
  })
  .catch( err => { 
  
	console.log('Error occured.. '+ err);
	
	res.status(500).json({ message: err.toString()});
  
  });	
});
	
});
 

module.exports = router;