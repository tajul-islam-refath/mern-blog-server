const app = require("./app");
const connectDB = require("./config/db.config");

const PORT = process.env.PORT || 5000;
const main = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log("Database connect failed!", e);
  }
};

main();
