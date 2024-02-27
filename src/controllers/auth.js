const { matchedData } = require("express-validator");

const AuthService = require("../service/AuthService");
const EmailService = require("../service/EmailService");
const UserRepository = require("../repository/userRepository");

const { catchAsyncErrorHandle } = require("../middlewarers/catchAsyncErrors");

const sendOTP = catchAsyncErrorHandle(async (req, res, next) => {
  const data = matchedData(req);
  let response = await AuthService.sendOTPByEmail(EmailService, data?.email);

  res.status(200).json({
    success: true,
    message: "Please check your email for OTP!",
    data: response,
  });
});

const signup = catchAsyncErrorHandle(async (req, res, next) => {
  const data = matchedData(req);
  data.image = req.file;

  let token = await AuthService.signup(UserRepository, data);

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
  let token = await AuthService.login(UserRepository, data);

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
  await AuthService.forgotPassword(UserRepository, data);
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
