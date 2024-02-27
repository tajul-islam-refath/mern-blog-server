const User = require("../models/User");
const UserRepository = require("../repository/userRepository");
const { authenticationError, authorizationError } = require("../utils/error");
const { verifyToken } = require("../utils/token");

exports.bindUserWithReq = () => async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await UserRepository.findByID(
      { _id: decoded._id },
      { username: 1, email: 1 }
    );
  }
  next();
};

exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    let user = await UserRepository.findByID(
      { _id: decoded._id },
      { username: 1, email: 1 }
    );

    if (!user) {
      return next(authenticationError());
    }

    req.user = user;
    next();
  } catch (err) {
    return next(authenticationError());
  }
};

/**
 *
 * @param {array} roles
 * @returns
 */
exports.authorize =
  (roles = ["admin"]) =>
  (req, _res, next) => {
    console.log("User", req.user);
    if (roles.includes(req.user.role)) {
      return next();
    }

    return next(authorizationError());
  };
