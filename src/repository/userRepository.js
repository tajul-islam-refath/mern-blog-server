const UserModel = require("../models/User");

class UserRepository {
  /**
   * Find By ID
   * @param {string} _id
   * @returns {user} user object
   */
  findByID = (_id, select = {}) => {
    return UserModel.findById(_id, select);
  };
  /**
   * Find By Email
   * @param {email} email
   * @returns {user} user object
   */
  findByEmail = (email, select = {}) => {
    return UserModel.findOne({ email: email }, select);
  };
  findByUsername = (username, select = {}) => {
    return UserModel.findOne({ username: username }, select);
  };
  findByUsernameWithArticles = (username) => {
    return UserModel.aggregate([
      {
        $match: { username: username },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "articles",
          pipeline: [{ $unset: ["body", "author", "updatedAt"] }], // unset to use remove field
        },
      },
      {
        $project: {
          username: 1,
          email: 1,
          profileImage: 1,
          name: 1,
          location: 1,
          bio: 1,
          website: 1,
          github: 1,
          linkedin: 1,
          articles: 1,
        },
      },
    ]);
  };
  /**
   * Find One
   * @param {query} query
   * @returns {user} user object
   */
  findOne = (query = {}, select = {}) => {
    return UserModel.findOne(query, select);
  };
  /**
   * Find All
   * @returns {array} user array
   */
  findAll = (select = {}) => {
    return UserModel.find({}, select);
  };
  /**
   * Create
   * @param {object} data
   * @returns {object} user object
   */
  create = (data) => {
    return UserModel.create(data);
  };
  /**
   * findByIdAndUpdate
   * @param {email} email
   * @param {object} updatedData
   * @returns {object} updated user object
   */
  findByIdAndUpdate = (id, updatedData) => {
    return UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: updatedData,
      },
      {
        new: true,
        select:
          "username name email bio location website github linkedin profileImage",
      }
    );
  };
  deleteById = (_id) => {
    return UserModel.findByIdAndDelete(_id);
  };
  deleteOne = (query) => {
    return UserModel.deleteOne(query);
  };
  deleteMany = (query) => {
    return UserModel.deleteMany(query);
  };
}

module.exports = new UserRepository();
