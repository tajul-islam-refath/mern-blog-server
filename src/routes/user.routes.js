const router = require("express").Router();

router.get("/profile/me");
router.get("/profile/:id");
module.exports = router;
