const express = require("express");
const dotenv = require("dotenv");

const configureSwagger = require("./config/swagger.config");
const configEnv = require("./config/dotenv.config");
const applyMiddleware = require("./middlewarers/applyMiddleware");
const { bindUserWithReq } = require("./middlewarers/authMiddleware");
const errorHandler = require("./middlewarers/error-handler.middleware");
const setupRoutes = require("./routes");

const app = express();

/**Dot env config */
configEnv();
/**Swagger config with app */
configureSwagger(app);
/**Middleware config  with app*/
applyMiddleware(app);
/* setup routes */
setupRoutes(app);

app.use(bindUserWithReq());

app.get("/", async (req, res) => {
  res.send("Wow!😯 are you here🙃🙃 application running!!! 😜😜😜");
});

/* Error handler middleware */
app.use(errorHandler);

module.exports = app;
