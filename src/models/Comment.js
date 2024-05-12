const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    article: {
      type: Schema.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
