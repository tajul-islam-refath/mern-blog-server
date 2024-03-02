const router = require("express").Router();

const { getSelfProfile, getByUsername } = require("../controllers/user");
const { isAuthenticated } = require("../middlewarers/authMiddleware");

router.get("/self/profile", isAuthenticated, getSelfProfile);
router.get("/:username", getByUsername);

// router.put("/update/profile, isAuthenticated, updateUserProfile);

module.exports = router;
