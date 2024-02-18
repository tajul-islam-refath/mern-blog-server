const router = require("express").Router();

const {
  login,
  registration,
  logout,
  forgotPassword,
  sendOTP,
} = require("../controllers/auth");

router.post("/login", login);
router.post("/sendOTP", sendOTP);
router.post("/registation", registration);
router.post("/forgotPassword", forgotPassword);
router.get("/logout", logout);

module.exports = router;
