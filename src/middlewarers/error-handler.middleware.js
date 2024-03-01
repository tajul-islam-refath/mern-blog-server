const { logger } = require("../utils/logger");
const errorHandler = (err, _req, res, next) => {
  // console.log("Error--> ", err.stack.split("\n"));
  logger.error(err.stack.split("\n"));
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.status ? err.message : "Internal server error",
    errors: err.errors || null,
  });
};

module.exports = errorHandler;
