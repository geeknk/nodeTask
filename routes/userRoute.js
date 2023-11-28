const express = require("express");
const router = express.Router();
const mid = require("../middleware/usermiddle.js");
const controller = require("../controllers/userController.js");

router.get("/register",mid.verifyEmail,controller.signup);
router.get("/get",mid.checkAuth,controller.getuser);
router.post("/auth/signin",controller.signin);
router.post("/address",mid.checkAuth,controller.user_address);
router.put("/delete",mid.checkAuth,controller.deluser);
router.put("/refresh",mid.verifyRT,controller.refreshuser);


module.exports = router