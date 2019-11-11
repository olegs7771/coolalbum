const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const AlbumSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    max: 30
  },
  desc: {
    type: String,
    required: true
  },

  image: {
    type: String
  },
  rotation: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  },
  gallery: [
    {
      uid: {
        type: String
      },
      img: {
        type: String
      },
      comments: {
        type: String
      },
      img_title: {
        type: String
      },
      rotation: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});
mongoose.set("useCreateIndex", true);
module.exports = Album = mongoose.model("album", AlbumSchema);
