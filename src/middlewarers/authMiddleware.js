const User = require("../models/Auth");
const { authenticationError, authorizationError } = require("../utils/error");
const { verifyToken } = require("../utils/token");

exports.bindUserWithReq = () => async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: decoded._id }, { password: 0 });
  }
  next();
};

exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    let user = await User.findById({ _id: decoded._id });

    if (!user) {
      next(authenticationError());
    }

    req.user = user;
    next();
  } catch (err) {
    next(authenticationError());
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
