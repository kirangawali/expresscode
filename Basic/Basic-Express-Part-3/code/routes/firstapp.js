var express = require('express');

var router = express.Router();


router.get('/first',(req, res, next) => {
	
	  res.send("Hello Login - First!");
	  
	  next();
	
});



router.get('/Second',(req, res, next) => {
	
	  res.send("Hello Login - Second!");
	  
	  next();
	
});

module.exports = router;