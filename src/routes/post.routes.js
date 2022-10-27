const router = require("express").Router();

const {
  createPostControler,
  getPostController,
  getMyPostsController,
} = require("../controllers/post.controller");
const { isAuthenticated } = require("../middlewarers/authMiddleware");

router.get("/myPosts", isAuthenticated, getMyPostsController);

router.post("/create", isAuthenticated, createPostControler);
router.get("/:id", getPostController);
module.exports = router;
