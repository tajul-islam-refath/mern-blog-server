const User = require("../module/auth/auth.module.model");
const Profile = require("../models/Profile");

exports.getMyProfile = (req, res, next) => {};
exports.getUserProfile = (req, res, next) => {};
exports.createUserProfile = async (req, res, next) => {
  const { name, title, bio, links, profilePic } = req.body;
  try {
    // console.log(req.body);
    const userProfile = new Profile({
      user: req.user._id,
      name,
      title,
      bio,
      links,
      profilePic,
    });

    await userProfile.save();

    console.log(userProfile);

    // const user = await User.findByIdAndUpdate(
    //   { _id: req.user._id },
    //   {
    //     $set: {
    //       profilePic,
    //     },
    //   },
    //   {
    //     new: true,
    //   }
    // );

    res.status(201).json({
      message: "User profile created successfully",
      profile: userProfile,
    });
  } catch (e) {
    next(e);
  }
};
exports.updateUserProfile = (req, res, next) => {};
exports.deleteUserProfile = (req, res, next) => {};
