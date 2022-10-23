const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    post: {
      type: Schema.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: "Auth",
      required: true,
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
    replies: [
      {
        body: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.ObjectId,
          ref: "Auth",
          required: true,
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
