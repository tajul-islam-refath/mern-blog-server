const { validationResult } = require("express-validator");
const validationFormater = require("../utils/validationFormater");
const { badRequest } = require("../utils/error");

const requestValidation = (req, res, next) => {
  const errors = validationResult(req).formatWith(validationFormater);
  if (!errors.isEmpty()) {
    return next(badRequest("Bad Request", errors.array()));
  }

  next();
};

module.exports = requestValidation;
