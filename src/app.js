const express = require("express");
const dotenv = require("dotenv");

const initializeSwagger = require("./config/swagger.config");
const initializeEnv = require("./config/dotenv.config");
const initializeMiddlewares = require("./middlewarers/initializeMiddlewares");
const { bindUserWithReq } = require("./middlewarers/authMiddleware");
const errorHandler = require("./middlewarers/error-handler.middleware");
const initializeRoutes = require("./routes");

const app = express();

/**initialize Env */
initializeEnv();
/**initialize Swagger */
initializeSwagger(app);
/**initialize Middlewares*/
initializeMiddlewares(app);
/**initialize Routes */
initializeRoutes(app);

app.use(bindUserWithReq());

app.get("/", async (req, res) => {
  res.send("Wow!😯 are you here🙃🙃 application running!!! 😜😜😜");
});

/* Error handler middleware */
app.use(errorHandler);

module.exports = app;
