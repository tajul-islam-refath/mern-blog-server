const mongoose = require("mongoose");

/**
 * Connect database
 */
const connectDB = async () => {
  const url = `mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@cluster0.ltldm.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;
  await mongoose.connect(url);
  console.log("Database connect success..");
};

module.exports = connectDB;
