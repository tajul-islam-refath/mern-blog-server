const express = require("express");
const dotenv = require("dotenv");

const configureSwagger = require("./config/swagger.config");
const applyMiddleware = require("./middlewarers/applyMiddleware");
const { bindUserWithReq } = require("./middlewarers/authMiddleware");

const errorHandler = require("./middlewarers/error-handler.middleware");
const setupRoutes = require("./routes");

dotenv.config();

const app = express();
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

/* 404 page handelling */
app.use((req, res, next) => {
  let error = new Error("404 page not found.");
  error.status = 404;
  next(error);
});

/* Error handler middleware */
app.use(errorHandler);

module.exports = app;
