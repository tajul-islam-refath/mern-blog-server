const { param } = require("express-validator");
const mongoose = require("mongoose");

const paramIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Param ID is required")
    .custom((id) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("The provided ID is not a valid MongoDB ObjectId");
      }
      return true;
    }),
];

module.exports = {
  paramIdValidation,
};
