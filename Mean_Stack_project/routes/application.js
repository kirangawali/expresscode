var express = require('express');

var router = express.Router();

const User  = require("../models/user");

var bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");

const checkAuth = require("../validate/check-auth");

router.get('/user',(req, res, next) => {
	
	  res.send("Hello Login - User!");
	  
	  next();
	
});

//Sign up Method
router.post("/signup" , (req,res,next) => {
	console.log(' signup method .. 1');
	
	bcrypt.hash(req.body.password, 10).
	then( 
	hash =>
	{
		console.log(' signup method hash : '+ hash);
		
		const userData = new User({
			userName: req.body.userName,
			loginName: req.body.loginName,
			password: hash,
			email: req.body.email,
			userType: req.body.userType,
			contactNumber: req.body.contactNumber,
			address: req.body.address 
   
  });
  console.log(' signup method  occured.. 2');
  userData.save().
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
 
//Login method 
 
router.post("/loginOne", (req, res) => {
console.log('**** loginOne *** start ');

let fetchedUser;
User.findOne({ userName : req.body.userName })
.then(user => {
if (!user) {
return res.status(401).json({
message: "Invalid username or passowrd !"
});
}
fetchedUser = user;
return bcrypt.compare(req.body.password, user.password);
})
.then(result => {
if (!result) {
return res.status(401).json({
message: "Invalid username or passowrd !"
});
}
const token = jwt.sign(
{ email: fetchedUser.userName  },
"secret_this_should_be_longer",
{ expiresIn: "5m" }
);
return  res.status(200).json({
token: token,
user : fetchedUser,
expiresIn : 60

/*,
"expiresIn": 3600  */

});
})
.catch(err => {
res.status(401).json({
message: "Invalid username or passowrd !"
});
});
});

//Retrive all users

router.get("/getUsers", (req, res, next) => {
	console.log('****getUsers --- Start 1');
  User.find().then(documents => {
	  console.log('getUsers --- Start 2');
    res.json(
      documents
    );
	console.log('****8getUsers --- Start 3');
  });
});
  
  
  
  
  // using this method to delete the user
  
  router.delete("/:id", (req,res,next) => {     
    console.log(' delete 1 ' + req.params.id);
      
    const user = new User({
      userName: req.body.userName,
      loginName: req.body.loginName,
      password: hash,
      email: req.body.email,
      userType: req.body.userType,
      contactNumber: req.body.contactNumber,
      address: req.body.address 
   
  });
    console.log(' delete occured.. 2 =  ' + user);
    User.deleteOne({_id :  req.params.id }).
    then (result => 
    {
      
      console.log('result : ' +result.toString());
      if(result.nModified > 0){
        
        console.log('delete --- Start 3');
        res.status(201).json({
                      message: "User deleted successfully",
                      result : result
                  });
  
      }
      else{
        console.log('Post --- Start 4');
        res.status(400).json({
                      message: "User delete failed",
                      result : result
                  });
  
      }
    })
    .catch( err => { 
    
    console.log('Delete Error occured.. '+ err);
    
    res.status(500).json({message: err.toString()});
    
    }); 
  });
  
  
  
 //Update User Method
router.put("/:id", (req,res,next) => {  
  let fetchedUser;   
  console.log(' update user 1 ' + req.body._id);
  
    
    const user = new User({
      _id : req.body._id,
      userName: req.body.userName,
      loginName: req.body.loginName,
      password: req.body.password,
      email: req.body.email,
      userType: req.body.userType,
      contactNumber: req.body.contactNumber,
      address: req.body.address 
   
  });
  console.log(' update user  occured.. 2 =  ' + user);
  User.updateOne({_id :  req.params.id }, user).
  then (result => 
  {
    
    console.log('result : ' +result.toString());

    if(result.nModified > 0){

      User.findOne({ _id : req.body._id })
      .then(user => {
        fetchedUser = user;
      });
      
      console.log('update user  --- Start 3');
      res.status(201).json({
                    message: "User updated successfully",
                    result : result , 
                    user : fetchedUser
                });

    }
    else{
      console.log('Post --- Start 4');
      res.status(400).json({
                    message: "User updated failed",
                    result : result
                });

    }
  })
  .catch( err => { 
  
  console.log('Error occured.. '+ err);
  
  res.status(500).json({ message : err.toString()});
  
  }); 
});


module.exports = router;