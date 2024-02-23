const { matchedData } = require("express-validator");

const Auth = require("../models/Auth");
const Profile = require("../models/Profile");

const AuthService = require("../service/AuthService");
const EmailService = require("../service/EmailService");

const UserRepository = require("../repository/userRepository");

const { catchAsyncErrorHandle } = require("../middlewarers/catchAsyncErrors");
const { generateOTP, generateOTPHash, verifyOTPHash } = require("../utils/otp");
const { signToken } = require("../utils/token");
const { generateHash, hashMatched } = require("../utils/hashing");
const { badRequest } = require("../utils/error");

const authService = new AuthService(UserRepository);

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
    message: "Registration successful!",
    data: {
      token: token,
    },
  });
});

const login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let user = await Auth.findOne({ email: email });

    if (!user) {
      throw badRequest("Bad cradentials");
    }

    let match = await hashMatched(password, user.password);
    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Email or password not match",
      });
    }

    const profile = await Profile.findOne({
      user: user._id,
    });

    res.status(200).json({
      success: false,
      message: "Login successfully",
      token: signToken({ _id: user._id }, process.env.JWT_SECRET),
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        profilePic: user.profilePic,
      },
      profile,
    });
  } catch (error) {
    console.error("Login error");
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  let { email, otp, hash, password } = req.body;

  try {
    if (!email || !password || !otp) {
      return res.status(404).json({
        success: false,
        message: "Email , password and OTP is required",
      });
    }

    let isVerified = verifyOTPHash(email, otp, hash);

    if (!isVerified) {
      return res.status(404).json({
        success: false,
        message: "password update failed try again with valid credentials",
      });
    }

    let hashPass = await generateHash(password, 11);
    let user = await Auth.findOneAndUpdate(
      { email: email },
      {
        $set: { password: hashPass },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Password changed successfully",
      token: user.getToken(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendOTP,
  login,
  signup,
  forgotPassword,
};
