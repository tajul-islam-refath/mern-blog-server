//user,title,bio,profilePic,links{fb,twit},posts[],booksMarks

const { Schema, model } = require("mongoose");
const profileSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "Auth",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    bio: {
      type: String,
      trim: true,
      required: true,
      maxlength: 500,
    },
    profilePic: {
      type: String,
    },
    links: {
      website: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
    },
    posts: [
      {
        type: Schema.ObjectId,
        ref: "Post",
      },
    ],
    bookmarks: [
      {
        type: Schema.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", profileSchema);

module.exports = Profile;
