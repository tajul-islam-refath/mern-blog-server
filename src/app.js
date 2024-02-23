const initializeEnv = require("./config/dotenv.config");
/**initialize Env */
initializeEnv();

const express = require("express");
const initializeSwagger = require("./config/swagger.config");
const initializeMiddlewares = require("./middlewarers/initializeMiddlewares");
const errorHandler = require("./middlewarers/error-handler.middleware");
const initializeRoutes = require("./routes");

const app = express();

/**initialize Swagger */
initializeSwagger(app);
/**initialize Middlewares*/
initializeMiddlewares(app);
/**initialize Routes */
initializeRoutes(app);

app.get("/", async (req, res) => {
  res.send("Wow!😯 are you here🙃🙃 application running!!! 😜😜😜");
});

/* Error handler middleware */
app.use(errorHandler);

module.exports = app;
