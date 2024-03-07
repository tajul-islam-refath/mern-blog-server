const { matchedData } = require("express-validator");

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
    message: "New article create successfully 🎉",
    data: {
      article: newArticle,
    },
  });
});

exports.getArticles = catchAsyncErrorHandle(async (req, res, next) => {
  let query = req.query;
  let result = await ArticleService.getAll(ArticleRepository, query);
  res.status(200).json({
    success: true,
    message: "All Articles 🎉",
    data: {
      ...result,
    },
  });
});

exports.getArticle = catchAsyncErrorHandle(async (req, res, next) => {
  let _id = req.params.id;

  let article = await ArticleService.getById(ArticleRepository, _id);
  res.status(200).json({
    success: true,
    message: "Single Article 🎉",
    data: {
      article,
    },
  });
});

exports.getArticlesByAuthor = catchAsyncErrorHandle(async (req, res, next) => {
  let user = req.user;

  let articles = await ArticleService.getByAuthor(ArticleRepository, user);
  res.status(200).json({
    success: true,
    message: "List of articles 🎉",
    data: {
      articles,
    },
  });
});

exports.deleteArticle = catchAsyncErrorHandle(async (req, res, next) => {
  let _id = req.params.id;
  const user = req.user;
  let article = await ArticleService.deleteById(ArticleRepository, _id, user);
  res.status(200).json({
    success: true,
    message: "Delete Article success 🎉",
    data: {
      article,
    },
  });
});

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
