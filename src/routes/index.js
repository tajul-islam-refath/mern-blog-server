const authRouter = require("./auth");
const userRouter = require("./user");
const articleRouter = require("./article");
const webRouter = require("./web");

const initializeRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/articles", articleRouter);
  app.use("/api/v1/web", webRouter);
};

module.exports = initializeRoutes;
