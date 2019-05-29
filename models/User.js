const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

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
