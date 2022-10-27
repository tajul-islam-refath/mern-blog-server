const router = require("express").Router();

const {
  getMyProfile,
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
  bookmarkPostAdd,
} = require("../controllers/user.controller");

const { isAuthenticated } = require("../middlewarers/authMiddleware");

router.get("/profile/me", isAuthenticated, getMyProfile);
router.get("/profile/:id", isAuthenticated, getUserProfile);

router.post("/profile/create", isAuthenticated, createUserProfile);
router.put("/profile/update", isAuthenticated, updateUserProfile);

router.post("/bookmark-post", isAuthenticated, bookmarkPostAdd);
module.exports = router;
