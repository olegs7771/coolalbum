const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true,
    max: 30
  },
  avatar: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  status: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  }
});
module.exports = Profile = mongoose.model("profiles", ProfileSchema);
