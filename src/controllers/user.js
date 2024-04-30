const UserService = require("../service/UserService");
const { catchAsyncErrorHandle } = require("../middlewarers/catchAsyncErrors");

exports.getSelfProfile = catchAsyncErrorHandle(async (req, res, next) => {
  const profile = await UserService.findById(req.user._id);

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
  const profile = await UserService.findByUsername(username);

  res.status(200).json({
    success: true,
    message: "User Profile With Articles 🎉",
    data: {
      profile,
    },
  });
});

exports.getBookmarks = catchAsyncErrorHandle(async (req, res, next) => {
  let user = req.user;
  const bookmarks = await UserService.getBookmarks(user);
  res.status(200).json({
    success: true,
    message: "User Profile With Articles 🎉",
    data: {
      bookmarks,
    },
  });
});

exports.updateUser = catchAsyncErrorHandle(async (req, res, next) => {
  let user = req.user;
  let data = req.body;
  data.image = req.file;

  const updatedUser = await UserService.update(user._id, data);

  res.status(200).json({
    success: true,
    message: "User Profile Updated 🎉",
    data: {
      user: updatedUser,
    },
  });
});
