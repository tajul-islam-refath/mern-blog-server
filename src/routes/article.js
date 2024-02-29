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
  getAllController,
  getSingleController,
} = require("../controllers/article");
const { paramIdValidation } = require("../validations/paramValidation");

router.get("/", getAllController);
router.post(
  "/",
  isAuthenticated,
  upload.single("cover"),
  articleValidation,
  requestValidation,
  authorize(["user"]),
  createArticle
);
router.get("/:id", paramIdValidation, requestValidation, getSingleController);

// router.get("/self", isAuthenticated, getMyPostsController);
// router.post("/:id/bookmark", isAuthenticated, bookmarkPostAdd);
// router.post("/:id/remove-bookmark", isAuthenticated, bookmarkDelete);
// router.post("/search", getSearchPosts);

module.exports = router;
