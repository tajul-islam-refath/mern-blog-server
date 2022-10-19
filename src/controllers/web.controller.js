const Auth = require("../module/auth/auth.module.model");
const Profile = require("../models/Profile");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.getWebContent = async (req, res, next) => {
  console.log(req.query);
  let itemPerPage = 10;
  let currentPage = parseInt(req.query.page);

  try {
  } catch (err) {
    next(err);
  }
};
