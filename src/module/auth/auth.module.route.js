const router = require("express").Router();

const {
  login,
  registration,
  logout,
  forgotPassword,
  sendOTP,
} = require("./auth.module.controller");

router.post("/sendOTP", sendOTP);
router.post("/login", login);
router.post("/registation", registration);
router.post("/forgotPassword", forgotPassword);
router.get("/logout", logout);

module.exports = router;
