const compression = require("compression");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { stream } = require("../utils/logger");
const rateLimiterMiddleware = require("./rateLimiterMiddleware");
const { bindUserWithReq } = require("../middlewarers/authMiddleware");
const initializeMiddlewares = (app) => {
  app.use(compression());
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(
    morgan(
      function (tokens, req, res) {
        return JSON.stringify({
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: Number.parseFloat(tokens.status(req, res)),
          content_length: tokens.res(req, res, "content-length"),
          response_time: Number.parseFloat(tokens["response-time"](req, res)),
        });
      },
      { stream }
    )
  );
  app.use(
    cors({
      origin: "*",
    })
  );
  // app.use(rateLimiterMiddleware);
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bindUserWithReq());
};

module.exports = initializeMiddlewares;
