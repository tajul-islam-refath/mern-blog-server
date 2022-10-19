const router = require("express").Router();

const { getWebContent } = require("../controllers/web.controller");
router.get("/", getWebContent);

module.exports = router;
