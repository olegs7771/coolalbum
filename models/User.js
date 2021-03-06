const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  password: {
    type: String
  },
  randomNum: {
    type: String
  },

  confirmed: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String
  },
  rotation: {
    type: String
  },
  token: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  },
  createdAt: { type: Date, expires: "2m", default: Date.now }
});

module.exports = User = mongoose.model("users", UserSchema);
