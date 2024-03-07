const { notFound } = require("../utils/error");

class UserService {
  constructor() {}

  findById = async (UserRepository, id) => {
    let profile = await UserRepository.findByID(id, {
      username: 1,
      email: 1,
      profileImage: 1,
    });
    return profile;
  };

  findByUsername = async (UserRepository, username) => {
    let profile = await UserRepository.findByUsernameWithArticles(username);
    if (profile.length == 0) {
      throw notFound();
    }

    return profile[0];
  };
}

module.exports = new UserService();
