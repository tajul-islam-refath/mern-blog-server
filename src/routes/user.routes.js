const router = require("express").Router();

const {
  getMyProfile,
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/user.controller");

const { isAuthenticated } = require("../middlewarers/authMiddleware");

router.get("/profile/me", isAuthenticated, getMyProfile);
router.get("/profile/:id", isAuthenticated, getUserProfile);

router.post("/profile/create", isAuthenticated, createUserProfile);
module.exports = router;
