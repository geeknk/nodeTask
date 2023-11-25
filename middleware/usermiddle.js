require("dotenv").config();
const jwt = require("jsonwebtoken");
const config = require("../config/constant");
const multer = require("multer")
const {User} = require("../models")

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
    const {email,id}=jwt.verify(token, config.secretKey);
    req.data= {email, token, id}
    next();
  } else {
    next();
  }
};

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