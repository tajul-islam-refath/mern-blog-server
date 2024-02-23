const router = require("express").Router();

const AuthController = require("../controllers/auth");
const requestValidation = require("../middlewarers/requestValidationMiddleware");
const {
  sendOTPValidation,
  signupValidation,
} = require("../validations/authValidation");

router.post(
  "/send-otp",
  sendOTPValidation,
  requestValidation,
  AuthController.sendOTP
);
router.post("/login", AuthController.login);
router.post(
  "/registation",
  signupValidation,
  requestValidation,
  AuthController.signup
);
router.post("/forgotPassword", AuthController.forgotPassword);

module.exports = router;
