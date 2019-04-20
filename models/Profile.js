const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String
  },
  password: {
    type: String,
    required: true,
    max: 30
  },

  confirmed: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String
  },
  token: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  }
});
module.exports = User = mongoose.model("users", UserSchema);
