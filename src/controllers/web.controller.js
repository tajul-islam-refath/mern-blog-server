const Auth = require("../module/auth/auth.module.model");
const Profile = require("../models/Profile");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.getWebContent = async (req, res, next) => {
  // console.log(req.query);
  let itemPerPage = 10;
  let currentPage = parseInt(req.query.page);

  let bookmarks = [];
  const posts = await Post.find().populate("author", "userName profilePic");
  const latestPosts = await Post.find().sort("createdAt").limit(4);

  if (req.user) {
    const profile = await Profile.find({ user: req.user._id });
    if (profile) {
      bookmarks = profile.bookmarks;
    }
  }

  // console.log(latestPosts.length);

  res.status(200).json({
    posts,
    latestPosts,
    bookmarks,
  });

  try {
  } catch (err) {
    next(err);
  }
};
