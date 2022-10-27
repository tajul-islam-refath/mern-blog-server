const redingTime = require("reading-time");

const Post = require("../models/Post");
const Profile = require("../models/Profile");

exports.createPostControler = async (req, res, next) => {
  let { title, body, tags, thumbnail } = req.body;

  if (tags) {
    tags = tags.split(",");
  }

  let readTime = redingTime(body).text;

  let post = new Post({
    title,
    body,
    tags,
    author: req.user._id,
    thumbail: thumbnail,
    readTime,
    totalViews: 0,
    likes: [],
    dislikes: [],
    comments: [],
  });

  try {
    let createPost = await post.save();

    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { posts: createPost._id } }
    );

    res.status(201).json({
      success: true,
      message: "New post was created successfully",
    });
  } catch (e) {
    next(e);
    console.log(e);
  }
};

exports.getPostController = async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findByIdAndUpdate(
    { _id: id },
    {
      $inc: {
        totalViews: 1,
      },
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    post,
  });
  try {
  } catch (err) {
    next(err);
  }
};

exports.getMyPostsController = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user._id });

    res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};
