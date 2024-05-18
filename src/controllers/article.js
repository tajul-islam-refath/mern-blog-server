const { matchedData } = require("express-validator");

const Post = require("../models/Article");
const Profile = require("../models/Profile");

const ArticleService = require("../service/ArticleService");

const { catchAsyncErrorHandle } = require("../middlewarers/catchAsyncErrors");
const RedisService = require("../service/RedisService");

exports.createArticle = catchAsyncErrorHandle(async (req, res, next) => {
  const article = matchedData(req);
  article.cover = req.file;
  const user = req.user;

  let newArticle = await ArticleService.create(article, user);

  res.status(201).json({
    success: true,
    message: "New article create successfully 🎉",
    data: {
      article: newArticle,
    },
  });

  RedisService.delete({
    pattern: "articles:page=*",
  });
});

exports.getArticles = catchAsyncErrorHandle(async (req, res, next) => {
  let query = req.query;

  const key = `articles:page=${query.page}&limit=${query.limit}&search=${
    query?.search || ""
  }`;
  let result = await RedisService.getOrSet(async () => {
    let data = await ArticleService.getAll(query);
    return data;
  }, key);

  res.status(200).json({
    success: true,
    message: "All Articles 🎉",
    data: {
      ...result,
    },
  });
});

exports.getArticle = catchAsyncErrorHandle(async (req, res, next) => {
  const _id = req.params.id;
  const key = `article:_id=${_id}`;

  const article = await RedisService.getOrSet(async () => {
    let data = await ArticleService.getById(_id);
    return data;
  }, key);

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
  let query = req.query;

  let result = await ArticleService.getByAuthor(user, query);
  res.status(200).json({
    success: true,
    message: "List of articles 🎉",
    data: {
      ...result,
    },
  });
});

exports.deleteArticle = catchAsyncErrorHandle(async (req, res, next) => {
  let _id = req.params.id;
  const user = req.user;

  let article = await ArticleService.deleteById(_id, user);

  res.status(200).json({
    success: true,
    message: "Delete article success 🎉",
    data: {
      article,
    },
  });

  RedisService.delete({
    keys: [`article:_id=${_id}`],
    pattern: "articles:page=*",
  });
});

exports.addPostToBookmark = catchAsyncErrorHandle(async (req, res, next) => {
  let articleId = req.params.id;
  await ArticleService.addToBookmark(req.user._id, articleId);

  res.status(200).json({
    success: true,
    message: "Add post to bookmarks",
    data: {
      id: articleId,
    },
  });
});

exports.removePostFromBookmark = catchAsyncErrorHandle(
  async (req, res, next) => {
    let articleId = req.params.id;
    await ArticleService.removeFromBookmark(req.user._id, articleId);
    res.status(200).json({
      success: true,
      message: "Remove post from bookmarks",
      data: {
        id: articleId,
      },
    });
  }
);

exports.getCommentsByArticle = catchAsyncErrorHandle(async (req, res, next) => {
  let _id = req.params.id;

  let comments = await ArticleService.getCommentsByArticle(_id);
  res.status(200).json({
    success: true,
    message: "Get all comments 🎉",
    comments,
  });
});

exports.createComment = catchAsyncErrorHandle(async (req, res, next) => {
  let articleId = req.params.id;
  let { body } = req.body;

  let response = await ArticleService.createComment(
    req.user._id,
    articleId,
    body
  );

  res.status(201).json({
    success: true,
    code: 200,
    message: "New comment created",
    comment: {
      ...response._doc,
    },
  });
});

exports.deleteComment = catchAsyncErrorHandle(async (req, res, next) => {
  let articleId = req.params.id;
  let commentId = req.params.commentId;
  const userId = req.user._id;
  let comment = await ArticleService.deleteCommentById(
    userId,
    articleId,
    commentId
  );

  res.status(200).json({
    success: true,
    message: "Delete Comment successfully 🎉",
    commentId: comment._id,
  });
});
