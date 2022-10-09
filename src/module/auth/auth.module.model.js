const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const authSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      maxlength: 15,
      required: true,
      unique: true,
    },
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

authSchema.methods.getToken = function () {
  var token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.KEY,
    { expiresIn: 5 * 60 * 60 * 1000 }
  );

  return token;
};

const Auth = model("Auth", authSchema);
module.exports = Auth;
