const errorHandler = (err, _req, res, next) => {
  console.log("Error--> ", err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
};

module.exports = errorHandler;
