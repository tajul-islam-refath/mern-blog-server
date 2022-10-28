const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    // let url = process.env.DB_URI;
    const url = `mongodb+srv://${process.env.dbName}:${process.env.dbPass}@cluster0.ltldm.mongodb.net/bdshop?retryWrites=true&w=majority`;
    // console.log(process.env);
    mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      },
      () => {
        console.log("Database connect success..");
      }
    );
  } catch (error) {
    if (error) {
      console.log("Failed database connect");
    }
  }
};

module.exports = dbConnection;
