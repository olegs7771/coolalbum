const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const AlbumSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true,
    max: 30
  },

  text: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  image_path: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  }
});
mongoose.set("useCreateIndex", true);
module.exports = Album = mongoose.model("albums", AlbumSchema);
