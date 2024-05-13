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
  addPostToBookmark,
  removePostFromBookmark,
  createComment,
  getCommentsByArticle,
  deleteComment,
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

router.get(
  "/:id/bookmark/add",
  isAuthenticated,
  paramIdValidation,
  requestValidation,
  addPostToBookmark
);
router.get(
  "/:id/bookmark/remove",
  isAuthenticated,
  paramIdValidation,
  requestValidation,
  removePostFromBookmark
);

// comments
router.get(
  "/:id/comments",
  isAuthenticated,
  authorize(["user"]),
  paramIdValidation,
  requestValidation,
  getCommentsByArticle
);
router.post(
  "/:id/comments",
  isAuthenticated,
  authorize(["user"]),
  paramIdValidation,
  requestValidation,
  createComment
);
router.delete(
  "/:id/comments/:commentId",
  isAuthenticated,
  authorize(["user"]),
  paramIdValidation,
  requestValidation,
  deleteComment
);
module.exports = router;
