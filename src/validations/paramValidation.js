const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const paramIdValidation = [
  param("id")
    .bail()
    .notEmpty()
    .withMessage("Param ID is required")
    .custom((id) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("The provided ID is not a valid MongoDB ObjectId");
      }
    }),
];

module.exports = {
  paramIdValidation,
};
