const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//routers
const users = require("./routers/api/users");

const app = express();

//bodyParser MiddleWare

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//db config
const db = require("./config/keys").mongoDB;
//connect to mongoDB

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to mongoDB"))
  .catch(err => console.log(err));

//Use routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port${port}`));
