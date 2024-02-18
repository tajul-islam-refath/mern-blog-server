const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const filePath = path.join(__dirname, "../api_doc.yml");
const swaggerDoc = YAML.load(filePath);

const configureSwagger = (app) => {
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
module.exports = configureSwagger;
