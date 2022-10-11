const router = require("express").Router();

const {
  getMyProfile,
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/user.controller");

router.get("/profile/me", getMyProfile);
router.get("/profile/:id", getUserProfile);
module.exports = router;
