const authRouter = require("./auth");
const userRouter = require("./user");
const postRouter = require("./post");
const webRouter = require("./web");

const initializeRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/posts", postRouter);
  app.use("/api/v1/web", webRouter);
};

module.exports = initializeRoutes;
