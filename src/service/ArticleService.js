const redingTime = require("reading-time");
const ArticleRepository = require("../repository/articleRepository");
const CommentRepository = require("../repository/commentRepository");

const cloudinary = require("../config/cloudinary.config");
const { getPagination } = require("../utils/query");
const { authorizationError, notFound } = require("../utils/error");
const defaults = require("../config/queryParam.config");
const userRepository = require("../repository/userRepository");

class ArticleService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }
  create = async (article, author) => {
    let imageResponse = null;
    if (article.cover) {
      imageResponse = await this.uploadCover(article.cover.path);
    }

    let readTime = redingTime(article.body).text;
    let newArticle = await ArticleRepository.create({
      title: article.title,
      body: article.body,
      author: author._id,
      cover: {
        publicId: imageResponse?.public_id || "",
        url: imageResponse?.url || "",
      },
      readTime,
      tags: article.tags,
    });

    return newArticle;
  };
  getById = async (_id) => {
    let populateOptions = [{ path: "author", select: "username profileImage" }];
    let article = await ArticleRepository.findByID(_id, {}, populateOptions);
    if (!article) {
      throw notFound(`Resource not found with this ${_id}`);
    }
    return article;
  };

  /**
   * Get articles
   * @param {*} param1
   * @returns
   */
  getAll = async ({
    page = defaults.page,
    limit = defaults.limit,
    sortType = defaults.sortType,
    sortBy = defaults.sortBy,
    search = defaults.search,
  }) => {
    const newSortType = `${sortType === "dsc" ? -1 : 1}`;
    let articles = await ArticleRepository.findAll({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortType: newSortType,
      search,
    });

    let count = await ArticleRepository.count(search);
    let pagination = getPagination({
      totalItems: count[0]?.total || 0,
      page,
      limit,
    });

    return {
      articles,
      pagination,
    };
  };

  /**
   * Get article by author
   
   * @param {*} author
   * @param {*} param2
   * @returns
   */
  getByAuthor = async (
    author,
    {
      page = defaults.page,
      limit = defaults.limit,
      sortType = defaults.sortType,
      sortBy = defaults.sortBy,
      search = defaults.search,
    }
  ) => {
    let articles = await ArticleRepository.findByAuthor(author._id, {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortType,
      search,
    });

    let count = await ArticleRepository.countByAuthor(search, author._id);
    let pagination = getPagination({
      totalItems: count[0]?.total || 0,
      page,
      limit,
    });

    return {
      articles,
      pagination,
    };
  };

  deleteById = async (_id, user) => {
    let article = await ArticleRepository.findByID(_id);
    if (!article) {
      throw notFound(`Resource not found with this ${_id}`);
    }

    let isOwner = await ArticleRepository.findOne({ _id, author: user._id });
    if (!isOwner) {
      throw authorizationError();
    }

    let deletedArticle = await ArticleRepository.deleteById(_id);
    await cloudinary.uploader.destroy(deletedArticle.cover.publicId);
    return {
      _id: deletedArticle._id,
    };
  };

  addToBookmark = async (user, articleId) => {
    return userRepository.addArticleToBookmark(user._id, articleId);
  };

  removeFromBookmark = async (user, articleId) => {
    return userRepository.removeArticleFromBookmark(user._id, articleId);
  };

  getCommentsByArticle = async (articleId) => {
    return this.commentRepository.findByArticle(articleId);
  };

  createComment = async (userId, articleId, commentBody) => {
    return this.commentRepository.create({
      user: userId,
      article: articleId,
      body: commentBody,
    });
  };

  deleteCommentById = async (userId, articleId, commentId) => {
    let isOwner = await this.commentRepository.findByIdAndUser(
      commentId,
      userId
    );

    if (!isOwner.length) {
      throw authorizationError();
    }

    let comment = await this.commentRepository.findByIdAndArticle(
      commentId,
      articleId
    );

    if (!comment.length) {
      throw badRequest();
    }

    return this.commentRepository.deleteById(commentId);
  };

  uploadCover = async (coverPath) => {
    return await cloudinary.uploader.upload(coverPath, {
      folder: process.env.CLOUDINARY_Folder,
    });
  };
}

module.exports = new ArticleService();
