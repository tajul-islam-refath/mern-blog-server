const router = require("express").Router();
const upload = require("../config/multer.config");
const {
  getSelfProfile,
  getByUsername,
  updateUser,
  getBookmarks,
} = require("../controllers/user");

const { isAuthenticated } = require("../middlewarers/authMiddleware");

router.get("/self", isAuthenticated, getSelfProfile);
router.get("/me/bookmarks", isAuthenticated, getBookmarks);
router.get("/:username", getByUsername);

router.put(
  "/profile",
  isAuthenticated,
  upload.single("profileImage"),
  updateUser
);

module.exports = router;
