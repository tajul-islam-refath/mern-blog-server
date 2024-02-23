const UserModel = require("../models/User");

class UserRepository {
  findByID = (_id) => {
    return UserModel.findById(_id);
  };
  findByEmail = (email) => {
    return UserModel.findOne({ email: email });
  };
  findOne = (query) => {
    return UserModel.findOne(query);
  };
  findAll = () => {
    return UserModel.find();
  };
  create = (data) => {
    return UserModel.create(data);
  };
  update = () => {};
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
