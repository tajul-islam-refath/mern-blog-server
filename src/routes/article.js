const router = require("express").Router();
const upload = require("../config/multer.config");
const { articleValidation } = require("../validations/articleValidation");
const requestValidation = require("../middlewarers/requestValidationMiddleware");
const {
  isAuthenticated,
  authorize,
} = require("../middlewarers/authMiddleware");
const {
  createArticle,
  getPostController,
  getMyPostsController,
  bookmarkPostAdd,
  bookmarkDelete,
  getSearchPosts,
} = require("../controllers/article");

router.post(
  "/",
  isAuthenticated,
  upload.single("cover"),
  articleValidation,
  requestValidation,
  authorize(["user"]),
  createArticle
);

router.get("/:id", getPostController);
router.get("/self", isAuthenticated, getMyPostsController);
router.post("/:id/bookmark", isAuthenticated, bookmarkPostAdd);
router.post("/:id/remove-bookmark", isAuthenticated, bookmarkDelete);
router.post("/search", getSearchPosts);

module.exports = router;
