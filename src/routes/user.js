const router = require("express").Router();

const { getSelfProfile, getByUsername } = require("../controllers/user");
const { isAuthenticated } = require("../middlewarers/authMiddleware");

router.get("/self/profile", isAuthenticated, getSelfProfile);
router.get("/:username", getByUsername);

// router.post("/profile/create", isAuthenticated, createUserProfile);
// router.put("/profile/update", isAuthenticated, updateUserProfile);

module.exports = router;
