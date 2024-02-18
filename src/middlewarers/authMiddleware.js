const User = require("../models/Auth");
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
  const token = req.headers.authorization;
  if (token) {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById({ _id: decoded._id });

    next();
  } else {
    return res.status(403).json({
      message: "You Don't have permission to access this page",
    });
  }
};
