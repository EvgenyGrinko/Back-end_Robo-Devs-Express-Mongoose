const jwt = require('jsonwebtoken');

//A moddleware function that will be added to routes, that need to be protected
//Access to these routes will be impossible without JWT token.
//Function checkes, if current user has token (token is added to the header if the user logged in)
module.exports = function (req, res, next){
  //Take token value from the header by it's name ('auth-token')
  const token = req.header('auth-token');
  //Deny access if there's no token in the header (this user is not logged in) 
  if(!token) return res.status(401).json({error: 'Access denied'})
  
  try{
    //Verify token. jwt.verify returns back a payload (an _id in the current case)
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified;
    next();
  }catch(err){
    res.status(400).json({error: 'Invalid token'})
  }
}