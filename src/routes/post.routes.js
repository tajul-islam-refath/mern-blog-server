const router = require("express").Router();

const { createPostControler } = require("../controllers/post.controller");
const { isAuthenticated } = require("../middlewarers/authMiddleware");

router.post("/create", isAuthenticated, createPostControler);

module.exports = router;
