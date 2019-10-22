const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const AlbumSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

    type: String,
    required: true,
    max: 30
  },


    type: String,
    required: true
  },
  location: {
    type: String
  },

    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  }
});
mongoose.set("useCreateIndex", true);

