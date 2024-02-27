const Profile = require("../models/Profile");
const Post = require("../models/Article");
const Comment = require("../models/Comment");

exports.getWebContent = async (req, res, next) => {
  // console.log(req.query);
  let itemPerPage = 10;
  let currentPage = parseInt(req.query.page);

  let bookmarks = [];
  const posts = await Post.find().populate("author", "userName profilePic");
  const latestPosts = await Post.find().sort("createdAt").limit(4);

  if (req.user) {
    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      bookmarks = profile.bookmarks;
    }
  }

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

exports.getDashboardContent = async (req, res, next) => {
  try {
    let totalPost = await Post.countDocuments({ author: req.user._id });
    let totalViews = await Post.aggregate([
      {
        $group: {
          _id: null,
          totalViews: {
            $sum: "$totalViews",
          },
        },
      },
    ]);

    console.log("totalPost ", totalPost);
    console.log("totalViews ", totalViews[0].totalViews);

    const latestPosts = await Post.find({ author: req.user._id })
      .sort("createdAt")
      .limit(8);

    res.status(200).json({
      success: true,
      totalPost,
      totalViews: totalViews[0].totalViews,
      latestPosts,
    });
  } catch (err) {
    console.log(err);
  }
};
