const { body } = require("express-validator");

const articleValidation = [
  body("title")
    .bail()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title length can not be greater than 100")
    .escape(),
  body("body").bail().notEmpty().withMessage("Body cannot be empty"),
  body("tags").optional(),
];

module.exports = {
  articleValidation,
};
