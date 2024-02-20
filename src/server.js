const app = require("./app");
const connectDB = require("./config/db.config");
const { logger } = require("./utils/logger");

const PORT = process.env.PORT || 5000;
const main = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App running on http://localhost:${PORT}`);
      logger.info(`🚀 App listening on the port ${PORT}`);
    });
  } catch (e) {
    console.log("Database connect failed!", e);
  }
};

main();
