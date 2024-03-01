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
  findByUsernameWithArticles = (username, select = {}) => {
    return UserModel.findOne({ username: username }, select).populate(
      "articles",
      "title tags readTime createdAt"
    );
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
   * findByEmailAndUpdate
   * @param {email} email
   * @param {object} updatedData
   * @returns {object} updated user object
   */
  findByEmailAndUpdate = (email, updatedData) => {
    return UserModel.findOneAndUpdate(
      { email: email },
      {
        $set: updatedData,
      },
      { new: true }
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
