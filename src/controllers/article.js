const redingTime = require("reading-time");

const Post = require("../models/Article");
const Profile = require("../models/Profile");
const ArticleService = require("../service/ArticleService");
const ArticleRepository = require("../repository/articleRepository");
const { catchAsyncErrorHandle } = require("../middlewarers/catchAsyncErrors");

exports.createArticle = catchAsyncErrorHandle(async (req, res, next) => {
  const article = matchedData(req);
  article.cover = req.file;
  const user = req.user;

  let newArticle = await ArticleService.create(
    ArticleRepository,
    article,
    user
  );

  res.status(201).json({
    success: true,
    message: "New article create successfully",
    data: {
      article: newArticle,
    },
  });
});

exports.getPostController = async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findByIdAndUpdate(
    { _id: id },
    {
      $inc: {
        totalViews: 1,
      },
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    post,
  });
  try {
  } catch (err) {
    next(err);
  }
};

exports.getMyPostsController = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user._id });

    res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.bookmarkPostAdd = async (req, res, next) => {
  try {
    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { bookmarks: req.body.id } }
    );

    res.status(200).json({
      success: true,
      message: "Post saved as bookmarks",
      id: req.body.id,
    });
  } catch (error) {
    next(error);
  }
};

exports.bookmarkDelete = async (req, res, next) => {
  console.log(req.body);
  try {
    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { bookmarks: req.body.id } }
    );

    res.status(200).json({
      success: true,
      message: "Remove post from bookmarks",
      id: req.body.id,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSearchPosts = async (req, res, next) => {
  let { term } = req.body;
  try {
    let posts = await Post.find({
      $text: {
        $search: term,
      },
    })
      .select("title")
      .populate("author", "userName");

    res.status(200).json({
      success: true,
      searchResults: posts,
    });
  } catch (error) {
    next(error);
  }
};
