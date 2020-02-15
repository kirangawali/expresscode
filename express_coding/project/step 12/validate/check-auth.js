const jwt = require("jsonwebtoken");

module.exports = (req, res, next ) =>
{
	try{
		
		console.log('Inside checkauth...'+ req.headers.authorization);
	const token = req.headers.authorization.split(" ")[1];
	
	jwt.verify(token ,"secret_this_should_be_longer");
	next();
	
	}
	catch(error)
	{
		console.log('Inside checkauth...error'+error);
		res.status(401).json({ mesaage : "Auth Failed "});
		
	}
	
	
};
