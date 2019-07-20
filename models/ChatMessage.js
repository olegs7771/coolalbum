const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChatMessage = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
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
// mongoose.set("useCreateIndex", true);
module.exports = ChatMessage = mongoose.model("chatMessage", ChatMessage);
