const { body } = require("express-validator");

const UserRepository = require("../repository/userRepository");
const { compareHash } = require("../utils/hashing");
const { badRequest } = require("../utils/error");

const sendOTPValidation = [
  body("email").notEmpty().escape().withMessage("Email can not be empty"),
  body("email").isEmail().withMessage("Invalid email"),
];

const signupValidation = [
  body("username")
    .notEmpty()
    .bail()
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3 to 15 chars")
    .custom(async (username) => {
      let existingUser = await UserRepository.findOne({ username });
      if (existingUser) {
        throw new Error("Username already exist");
      }
    }),
  body("email")
    .notEmpty()
    .bail()
    .isEmail()
    .escape()
    .withMessage("Provide a valid email address.")
    .custom(async (email) => {
      let existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        throw new Error("User already exist using this email");
      }
    }),
  body("password")
    .notEmpty()
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be equal or greater than 8 chars"),
];

const signinValidation = [
  body("email")
    .notEmpty()
    .bail()
    .isEmail()
    .escape()
    .withMessage("Provide a valid email address.")
    .custom(async (email) => {
      let existingUser = await UserRepository.findByEmail(email);
      if (!existingUser) {
        throw new Error("Invalid cradentials");
      }
    }),
  body("password")
    .notEmpty()
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be equal or greater than 8 chars")
    .custom(async (password, { req }) => {
      let existingUser = await UserRepository.findByEmail(req.body.email);
      if (!existingUser) {
        throw new Error("Invalid cradentials");
        return;
      }
      let match = await compareHash(password, existingUser.password);
      if (!match) {
        throw badRequest("Invalied cradentials");
      }
    }),
];

const forgotPasswordValidation = [
  body("email")
    .notEmpty()
    .bail()
    .isEmail()
    .escape()
    .withMessage("Provide a valid email address.")
    .custom(async (email) => {
      let existingUser = await UserRepository.findByEmail(email);
      if (!existingUser) {
        throw new Error("Invalid cradentials");
      }
    }),
  body("password")
    .notEmpty()
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be equal or greater than 8 chars"),
  body("otp")
    .notEmpty()
    .bail()
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 chars"),
];

module.exports = {
  sendOTPValidation,
  signupValidation,
  signinValidation,
  forgotPasswordValidation,
};
