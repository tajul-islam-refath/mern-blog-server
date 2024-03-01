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
  getArticles,
  getArticle,
  getArticlesByAuthor,
  deleteArticle,
} = require("../controllers/article");
const { paramIdValidation } = require("../validations/paramValidation");

router.get("/", getArticles);
router.get("/:id", paramIdValidation, requestValidation, getArticle);
router.get("/author/self", isAuthenticated, getArticlesByAuthor);
router.post(
  "/",
  isAuthenticated,
  authorize(["user"]),
  upload.single("cover"),
  articleValidation,
  requestValidation,
  createArticle
);
router.delete(
  "/:id",
  isAuthenticated,
  authorize(["user"]),
  paramIdValidation,
  requestValidation,
  deleteArticle
);

// router.post("/:id/bookmark", isAuthenticated, bookmarkPostAdd);
// router.post("/:id/remove-bookmark", isAuthenticated, bookmarkDelete);
// router.post("/search", getSearchPosts);

module.exports = router;
