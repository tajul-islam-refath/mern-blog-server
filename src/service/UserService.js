const UserModel = require("../models/User");
class UserService {
  constructor() {}

  findOne = (query) => {
    return UserModel.findOne(query);
  };
  findAll = () => {
    return UserModel.find();
  };
  create = () => {};
  delete = () => {};
  update = () => {};
}
