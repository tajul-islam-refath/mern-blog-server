const router = require("express").Router();

const upload = require("../config/multer.config");
const AuthController = require("../controllers/auth");
const requestValidation = require("../middlewarers/requestValidationMiddleware");

const {
  sendOTPValidation,
  signupValidation,
  signinValidation,
  forgotPasswordValidation,
} = require("../validations/authValidation");

router.post(
  "/send-otp",
  sendOTPValidation,
  requestValidation,
  AuthController.sendOTP
);
router.post(
  "/signin",
  signinValidation,
  requestValidation,
  AuthController.login
);
router.post(
  "/signup",
  upload.single("profileImage"),
  signupValidation,
  requestValidation,
  AuthController.signup
);
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  requestValidation,
  AuthController.forgotPassword
);

module.exports = router;
