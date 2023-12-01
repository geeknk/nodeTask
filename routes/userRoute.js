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
router.put("/changePassword",mid.checkAuth,controller.changePass);
router.post("/forgot-password",controller.verifyuser);
router.put("/verify-reset-password",mid.checkAuth,controller.forgetPass);
router.put("/updateuser",mid.checkAuth,controller.updateuser);
router.get("/list/:page",controller.userlist);
router.put("/profile-image",mid.upload,controller.profileImg);
router.post("/fetch/flipkart/mobile",controller.flipkartMob);
router.post("/fetch/flipkart/mobile/all",controller.flipkartAllMob);
router.post("/fetch/snapdeal/t-shirt",controller.snapdealTshirt);

module.exports = router