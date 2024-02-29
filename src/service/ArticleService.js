const redingTime = require("reading-time");
const cloudinary = require("../config/cloudinary.config");

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
    return ArticleRepository.findByID(_id, {}, populateOptions);
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

  uploadCover = async (coverPath) => {
    return await cloudinary.uploader.upload(coverPath, {
      folder: process.env.CLOUDINARY_Folder,
    });
  };
}

module.exports = new ArticleService();
