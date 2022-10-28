const router = require("express").Router();

const {
  createPostControler,
  getPostController,
  getMyPostsController,
  bookmarkPostAdd,
  bookmarkDelete,
  getSearchPosts,
} = require("../controllers/post.controller");
const { isAuthenticated } = require("../middlewarers/authMiddleware");

router.get("/myPosts", isAuthenticated, getMyPostsController);

router.post("/create", isAuthenticated, createPostControler);
router.get("/:id", getPostController);

router.post("/bookmark-post", isAuthenticated, bookmarkPostAdd);
router.post("/bookmark-delete", isAuthenticated, bookmarkDelete);
router.post("/search", getSearchPosts);
module.exports = router;
