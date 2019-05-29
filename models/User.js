const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

<<<<<<< HEAD
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
  status: {
    type: String
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
=======
const UserSchema = new Schema(
  {
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
>>>>>>> 5c5435054029ae662bca7fd5325214cb270bc4da

    date: {
      type: Date,
      default: Date.now()
    },
    randomNum: {
      type: String,
      createdAt: { type: Date, expires: "1m", default: Date.now }
    }
  },
  { timestamps: true }
);
UserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });
module.exports = User = mongoose.model("users", UserSchema);
