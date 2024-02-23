const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      maxlength: 15,
      required: true,
      unique: true,
    },
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
