const redingTime = require("reading-time");
const cloudinary = require("../config/cloudinary.config");
const { authorizationError, notFound } = require("../utils/error");

class ArticleService {
  create = async (ArticleRepository, article, author) => {
    let uploadResponse = await this.uploadCover(article.cover.path);
    let readTime = redingTime(article.body).text;
    let tags = [];
    if (article.tags) {
      tags =
        typeof article.tags == "string"
          ? article.tags.split(",")
          : article.tags;
    }

    let newArticle = await ArticleRepository.create({
      title: article.title,
      body: article.body,
      author: author._id,
      cover: {
        publicId: uploadResponse.public_id,
        url: uploadResponse.url,
      },
      readTime,
      tags: tags,
    });

    return newArticle;
  };
  getById = async (ArticleRepository, _id) => {
    let populateOptions = [{ path: "author", select: "username profileImage" }];
    let article = await ArticleRepository.findByID(_id, {}, populateOptions);
    if (!article) {
      throw notFound(`Resource not found with this ${_id}`);
    }
    return article;
  };

  getAll = async (ArticleRepository) => {
    let populateOptions = [
      { path: "author", select: "username profileImage -_id" },
    ];
    return ArticleRepository.findAll(
      { title: 1, cover: 1, readTime: 1, createdAt: 1 },
      populateOptions
    );
  };

  getByAuthor = async (ArticleRepository, author) => {
    let articles = await ArticleRepository.findByAuthor(author._id, {
      title: 1,
      cover: 1,
      readTime: 1,
      createdAt: 1,
    });
    if (!articles) {
      throw notFound(`Resource not found`);
    }
    return articles;
  };

  deleteById = async (ArticleRepository, _id, user) => {
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
  uploadCover = async (coverPath) => {
    return await cloudinary.uploader.upload(coverPath, {
      folder: process.env.CLOUDINARY_Folder,
    });
  };
}

module.exports = new ArticleService();
