const { validationResult } = require("express-validator");
const validationFormater = require("../utils/validationFormater");
const { badRequest } = require("../utils/error");

const requestValidation = (req, res, next) => {
  // console.log(req.body);
  const errors = validationResult(req).formatWith(validationFormater);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(badRequest("Bad Request", errors.array()));
  }

  next();
};

module.exports = requestValidation;
