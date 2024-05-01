const cluster = require("cluster");
const os = require("os");

const app = require("./src/app");
const connectDB = require("./src/config/db.config");
// const { logger } = require("./src/utils/logger");

if (cluster.isMaster) {
  // Master process
  const numCPUs = os.cpus().length;

  console.log(`numCPUs ${numCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker termination and fork a new one
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const PORT = process.env.PORT || 5000;
  const main = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        // logger.info(`🚀 App listening on the port ${PORT}`);
        console.log(`🚀 App listening on the port ${PORT}`);
      });
    } catch (e) {
      console.log("Database connect failed!", e);
    }
  };

  main();
}
