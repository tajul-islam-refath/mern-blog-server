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
    name: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
    },
    profileImage: {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    website: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
