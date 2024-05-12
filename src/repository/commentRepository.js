const Model = require("../models/Comment");

class CommentRepository {
  findByArticle = (_articleId) => {
    return Model.aggregate([
      {
        $match: { article: _articleId },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
          pipeline: [
            {
              $project: {
                username: 1,
                profileImage: 1,
              },
            },
          ],
        },
      },
      // sort stage
      {
        $sort: { updatedAt: -1 },
      },
      // project stage -> format each document
      {
        $project: {
          _id: 1,
          body: 1,
          createdAt: 1,
          user: 1,
        },
      },
    ]);
  };

  findByUser = (_userId) => {
    return Model.aggregate([
      {
        $match: { user: _userId },
      },
      // sort stage
      {
        $sort: { updatedAt: -1 },
      },
      // project stage -> format each document
      {
        $project: {
          _id: 1,
          body: 1,
          createdAt: 1,
        },
      },
    ]);
  };

  create = async (data) => {
    let aerticle = await Model.create(data);
    return aerticle.populate("user", "username profileImage");
  };

  deleteById = (_id) => {
    return Model.findByIdAndDelete(_id);
  };
}

module.exports = CommentRepository;
