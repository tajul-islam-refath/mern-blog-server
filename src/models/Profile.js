//user,title,bio,profilePic,links{fb,twit},posts[],booksMarks

const { Schema, model } = require("mongoose");
const profileSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
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
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", profileSchema);

module.exports = Profile;
