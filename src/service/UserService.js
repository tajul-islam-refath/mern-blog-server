const UserRepository = require("../repository/userRepository");
const cloudinary = require("../config/cloudinary.config");
const { notFound } = require("../utils/error");

class UserService {
  constructor() {}

  findById = async (id) => {
    let profile = await UserRepository.findByID(id, {
      username: 1,
      email: 1,
      profileImage: 1,
      name: 1,
      location: 1,
      bio: 1,
      website: 1,
      github: 1,
      linkedin: 1,
    });
    return profile;
  };

  findByUsername = async (username) => {
    let profile = await UserRepository.findByUsernameWithArticles(username);
    if (profile.length == 0) {
      throw notFound();
    }

    return profile[0];
  };

  update = async (userId, data) => {
    let { name, location, bio, website, github, linkedin, image } = data;

    let profile = await UserRepository.findByID(userId, {
      profileImage: 1,
    });

    // upload new user profile image
    let imageResponse = null;
    if (image) {
      imageResponse = await cloudinary.uploader.upload(image.path, {
        folder: process.env.CLOUDINARY_Folder,
      });

      //destroy  user profile image
      if (profile.profileImage?.publicId) {
        await cloudinary.uploader.destroy(profile.profileImage?.publicId);
      }
    }

    let updatedUser = await UserRepository.findByIdAndUpdate(userId, {
      name,
      location,
      bio,
      website,
      github,
      linkedin,
      profileImage: {
        publicId: imageResponse
          ? imageResponse.public_id
          : profile.profileImage?.publicId,
        url: imageResponse ? imageResponse.url : profile.profileImage?.url,
      },
    });

    delete updatedUser.password;
    console.log(updatedUser);
    return updatedUser;
  };

  getBookmarks = async (user) => {
    let data = await UserRepository.findByID(user._id, {
      bookmarks: 1,
      _id: 0,
    });
    return data.bookmarks;
  };
}

module.exports = new UserService();
