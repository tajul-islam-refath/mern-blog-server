const UserModel = require("../models/User");

class UserRepository {
  /**
   * Find By ID
   * @param {string} _id
   * @returns {user} user object
   */
  findByID = (_id) => {
    return UserModel.findById(_id);
  };
  /**
   * Find By Email
   * @param {email} email
   * @returns {user} user object
   */
  findByEmail = (email) => {
    return UserModel.findOne({ email: email });
  };
  /**
   * Find One
   * @param {query} query
   * @returns {user} user object
   */
  findOne = (query = {}) => {
    return UserModel.findOne(query);
  };
  /**
   * Find All
   * @returns {array} user array
   */
  findAll = () => {
    return UserModel.find();
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

module.exports = UserRepository;
