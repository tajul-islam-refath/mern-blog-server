const router = require("express").Router();

const {
  createPostControler,
  getPostController,
} = require("../controllers/post.controller");
const { isAuthenticated } = require("../middlewarers/authMiddleware");

router.post("/create", isAuthenticated, createPostControler);
router.get("/:id", getPostController);
module.exports = router;
