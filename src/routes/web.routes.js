const router = require("express").Router();

const {
  getWebContent,
  getDashboardContent,
} = require("../controllers/web.controller");

const { isAuthenticated } = require("../middlewarers/authMiddleware");

router.get("/", getWebContent);
router.get("/dashboard", isAuthenticated, getDashboardContent);

module.exports = router;
