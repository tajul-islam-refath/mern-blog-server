const jwt = require("jsonwebtoken");
const User = require("../module/auth/auth.module.model");

exports.bindUserWithReq = () => async (req, res, next) => {
  // console.log("token : ", req.headers.authorization);
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = await User.findById({ _id: decoded._id });
  }
  next();
};
exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = await User.findById({ _id: decoded._id });

    next();
  } else {
    return res.status(403).json({
      message: "You Don't have permission to access this page",
    });
  }
};
