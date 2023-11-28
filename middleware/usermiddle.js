require("dotenv").config();
const jwt = require("jsonwebtoken");
const config = require("../config/constant");
const multer = require("multer")
const {User} = require("../models");

exports.verifyEmail = async (req, res, next) => {
  const userData = await User.findOne({where:{ email: req.body.email }});

  if (userData) {
    return res.status(409).send({ success: false, msg: "Email already exist" });
  } else {
    next();
  }
};

exports.checkAuth = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    const {email,id}=jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    req.data= {email, token, id}
    next();
  } else {
    next();
  }
};

exports.verifyRT = async (req,res,next) =>{
  if (req.cookies?.jwt) { 
  
    // Destructuring refreshToken from cookie 
    const refreshToken = req.cookies.jwt; 

    // Verifying refresh token 
    jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET,  
    (err, decoded) => { 
        if (err) { 
            // Wrong Refesh Token 
            return res.status(406).json({ message: 'Unauthorized' }); 
        } 
        else { 
            // Correct token we send a new access token
            req.data = email;
            next();
        } 
    }) 
  } else { 
      return res.status(406).json({ message: 'Unauthorized' });
  } 
}

exports.upload = multer({
  storage:multer.diskStorage({
    destination: function (req,file,cb){
      cb(null, "uploads")
    },
    filename: function(req,file,cb){
      cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
  })
  }).single("user_file");