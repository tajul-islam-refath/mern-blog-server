const { logger } = require("../utils/logger");
const errorHandler = (err, _req, res, next) => {
  console.log("Error--> ", err);
  logger.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    errors: err.errors,
  });
};

module.exports = errorHandler;
