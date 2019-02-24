const express = require("express");
const mongoose = require("mongoose");

const app = express();

//db config
const db = require("./config/keys").mongoDB;
//connect to mongoDB

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to mongoDB"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port${port}`));
