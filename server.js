const express = require("express");
const mongoose = require("mongoose");

//db config
const db = require("./config/keys").mongoDB;
//connect to mongoDB

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to mongoDB"))
  .catch(err => console.log(err));
