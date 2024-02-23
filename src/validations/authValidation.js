const { body } = require("express-validator");

const sendOTPValidation = [
  body("email").notEmpty().escape().withMessage("Email can not be empty"),
  body("email").isEmail().withMessage("Invalid email"),
];

const signupValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username can not be empty")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3 to 15 chars"),
  body("email").notEmpty().escape().withMessage("Email can not be empty"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password can not be empty")
    .isLength({ min: 8 })
    .withMessage("Password Must Be Greater Than 6 Chars"),
  body("otp")
    .notEmpty()
    .withMessage("OTP can not be empty")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP length must be 6"),
];

module.exports = {
  sendOTPValidation,
  signupValidation,
};
