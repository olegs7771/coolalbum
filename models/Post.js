const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String
  },
  toID: {
    type: String
  },
  senderAvatar: {
    type: String
  },
  senderEmail: {
    type: String
  },
  senderName: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
module.exports = Post = mongoose.model("post", PostSchema);
