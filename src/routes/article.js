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
  deleteArticle,
} = require("../controllers/article");
const { paramIdValidation } = require("../validations/paramValidation");

router.get("/", getArticles);
router.post(
  "/",
  isAuthenticated,
  authorize(["user"]),
  upload.single("cover"),
  articleValidation,
  requestValidation,
  createArticle
);
router.get("/:id", paramIdValidation, requestValidation, getArticle);
router.delete(
  "/:id",
  isAuthenticated,
  authorize(["user"]),
  paramIdValidation,
  requestValidation,
  deleteArticle
);
// router.get("/self", isAuthenticated, getMyPostsController);
// router.post("/:id/bookmark", isAuthenticated, bookmarkPostAdd);
// router.post("/:id/remove-bookmark", isAuthenticated, bookmarkDelete);
// router.post("/search", getSearchPosts);

module.exports = router;
