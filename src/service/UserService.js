const { notFound } = require("../utils/error");

class UserService {
  constructor() {}

  findById = async (UserRepository, user) => {
    let profile = await UserRepository.findByID(user._id, {
      username: 1,
      email: 1,
      profileImage: 1,
    });
    return profile;
  };

  findByUsername = async (UserRepository, username) => {
    let profile = await UserRepository.findByUsernameWithArticles(username, {
      username: 1,
      email: 1,
      profileImage: 1,
    });
    if (!profile) {
      throw notFound();
    }
    return profile;
  };

  create = () => {};
  delete = () => {};
  update = () => {};
}

module.exports = new UserService();
