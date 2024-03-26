const { body } = require("express-validator");

const articleValidation = [
  body("title")
    .bail()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title length can not be greater than 100")
    .escape(),
  body("body")
    .bail()
    .notEmpty()
    .withMessage("Body cannot be empty")
    .isLength({ max: 5000 })
    .withMessage("Body length can not be greater than 5000"),
  body("tags").optional(),
];

module.exports = {
  articleValidation,
};
