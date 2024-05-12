const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Model = require("../models/Comment");

class CommentRepository {
  findByArticle = (articleId) => {
    return Model.aggregate([
      {
        $match: {
          article: ObjectId(`${articleId}`),
        },
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
      // remove field
      {
        $unwind: "$user",
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
          user: 1,
          createdAt: 1,
          article: 1,
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

  findByIdAndUser = (_id, userId) => {
    return Model.find({
      _id,
      user: userId,
    });
  };

  findByIdAndArticle = (_id, articleId) => {
    return Model.find({
      _id,
      article: articleId,
    });
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
