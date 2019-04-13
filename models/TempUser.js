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
  password: {
    type: String
  },
  avatar: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  },
  GENERATED_VERIFYING_URL: String
});
module.exports = TempUser = mongoose.model("temporary_users", UserSchema);
