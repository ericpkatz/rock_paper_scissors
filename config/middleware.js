var jwt = require("jwt-simple");

function checkAuthentication(req, res, next){
   try{
      jwt.decode(req.headers.auth, process.env.SECRET || 'foo');
      next();
   }
   catch(ex){
     res.status(401).send("not authorized"); 
   }
}

module.exports = {
  checkAuthentication : checkAuthentication
}
