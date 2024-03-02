const User = require("../models/User");
const Profile = require("../models/Profile");
const { ObjectId } = require("mongoose");
const UserService = require("../service/UserService");
const userRepository = require("../repository/userRepository");
const { catchAsyncErrorHandle } = require("../middlewarers/catchAsyncErrors");

exports.getSelfProfile = catchAsyncErrorHandle(async (req, res, next) => {
  const profile = await UserService.findById(userRepository, req.user._id);

  res.status(200).json({
    success: true,
    message: "User Profile Information 🎉",
    data: {
      profile,
    },
  });
});

exports.getByUsername = catchAsyncErrorHandle(async (req, res, next) => {
  let username = req.params.username;
  const profile = await UserService.findByUsername(userRepository, username);

  res.status(200).json({
    success: true,
    message: "User Profile With Articles 🎉",
    data: {
      profile,
    },
  });
});
