const redingTime = require("reading-time");
const cloudinary = require("../config/cloudinary.config");

class ArticleService {
  create = async (ArticleRepository, article, author) => {
    let uploadResponse = await this.uploadCover(article.cover.path);
    let readTime = redingTime(body).text;

    let newArticle = await ArticleRepository.create({
      title: article.title,
      body: article.body,
      author: author._id,
      cover: {
        publicId: uploadResponse.public_id,
        url: uploadResponse.url,
      },
      readTime,
      tags: article.tags,
    });

    return newArticle;
  };

  uploadCover = async (coverPath) => {
    return await cloudinary.uploader.upload(coverPath, {
      folder: process.env.CLOUDINARY_Folder,
    });
  };
}

module.exports = new ArticleService();
