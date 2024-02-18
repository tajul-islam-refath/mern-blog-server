const compression = require("compression");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const applyMiddleware = (app) => {
  app.use(compression());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(cors());

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));
};

module.exports = applyMiddleware;
