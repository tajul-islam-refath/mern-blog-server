const router = require("express").Router();

const AuthController = require("../controllers/auth");
const requestValidation = require("../middlewarers/requestValidationMiddleware");
const {
  sendOTPValidation,
  signupValidation,
  signinValidation,
} = require("../validations/authValidation");

router.post(
  "/send-otp",
  sendOTPValidation,
  requestValidation,
  AuthController.sendOTP
);
router.post(
  "/login",
  signinValidation,
  requestValidation,
  AuthController.login
);
router.post(
  "/signup",
  signupValidation,
  requestValidation,
  AuthController.signup
);
router.post("/forgotPassword", AuthController.forgotPassword);

module.exports = router;
