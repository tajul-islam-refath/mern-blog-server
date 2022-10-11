const express = require("express");
const compression = require("compression");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { bindUserWithReq } = require("./middlewarers/authMiddleware");
const errorHandler = require("./middlewarers/error-handler.middleware");
const authRouter = require("./module/auth/auth.module.route");
const userRouter = require("./routes/user.routes");

dotenv.config();
const app = express();

/* Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app. */
app.use(compression());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(bindUserWithReq());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* setup routes */
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

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
// app.use(errorHandler);

module.exports = app;
