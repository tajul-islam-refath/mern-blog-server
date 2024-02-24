const { matchedData } = require("express-validator");

const AuthService = require("../service/AuthService");
const EmailService = require("../service/EmailService");
const UserRepository = require("../repository/userRepository");

const { catchAsyncErrorHandle } = require("../middlewarers/catchAsyncErrors");
const { generateOTP, generateOTPHash, verifyOTPHash } = require("../utils/otp");
const { signToken } = require("../utils/token");
const { generateHash, hashMatched } = require("../utils/hashing");
const { badRequest } = require("../utils/error");

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

const sendOTP = catchAsyncErrorHandle(async (req, res, next) => {
  const data = matchedData(req);
  let response = await authService.sendOTPByEmail(EmailService, data?.email);

  res.status(200).json({
    success: true,
    message: "Please check your email for OTP!",
    data: response,
  });
});

const signup = catchAsyncErrorHandle(async (req, res, next) => {
  const data = matchedData(req);

  let token = await authService.signup(data);

  res.status(200).json({
    success: true,
    message: "Signup successful 🎉",
    data: {
      token: token,
    },
  });
});

const login = catchAsyncErrorHandle(async (req, res, next) => {
  const data = matchedData(req);
  let token = await authService.login(data);

  res.status(200).json({
    success: false,
    message: "Login successful 🎉",
    data: {
      token,
    },
  });
});

const forgotPassword = catchAsyncErrorHandle(async (req, res, next) => {
  const data = matchedData(req);
  await authService.forgotPassword(data);
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

module.exports = {
  sendOTP,
  login,
  signup,
  forgotPassword,
};
