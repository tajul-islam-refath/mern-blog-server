const router = require("express").Router();

const AuthController = require("../controllers/auth");

router.post("/send-otp", AuthController.sendOTP);
router.post("/login", AuthController.login);
router.post("/registation", AuthController.registration);
router.post("/forgotPassword", AuthController.forgotPassword);

module.exports = router;
