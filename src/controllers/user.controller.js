const User = require("../module/auth/auth.module.model");
const Profile = require("../models/Profile");
const { ObjectId } = require("mongoose");

exports.getMyProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user._id,
    });

    res.status(200).json({
      profile: profile,
    });
  } catch (error) {
    next(error);
  }
};

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
exports.updateUserProfile = async (req, res, next) => {
  console.log(req.body);

  
  try {
    await Profile.findByIdAndUpdate(
      { user: req.user._id },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (req.body.profilePic) {
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            profilePic: req.body.profilePic,
          },
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Updated profile successfully",
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteUserProfile = (req, res, next) => {};
