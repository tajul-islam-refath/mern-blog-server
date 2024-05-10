const app = require("./src/app");
const connectDB = require("./src/config/db.config");
const { logger } = require("./src/utils/logger");

const PORT = process.env.PORT || 5000;
const main = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`🚀 App listening on the port ${PORT}`);
    });
  } catch (e) {
    console.log("Database connect failed!", e);
  }
};

main();
