const express = require("express");
const router = express.Router();
const mid = require("../middleware/usermiddle.js");
const controller = require("../controllers/userController.js");

router.get("/register",mid.verifyEmail,controller.signup);
router.get("/get",mid.checkAuth,controller.getuser);
router.post("/auth/signin",controller.signin);
router.post("/address",mid.checkAuth,controller.user_address);


module.exports = router