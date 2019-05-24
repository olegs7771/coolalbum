const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const Nexmo = require("nexmo");

// init nexmo sms sending

const nexmo = new Nexmo(
  {
    apiKey: "5b8b4a3e",
    apiSecret: "dCstfbHMktqY7LIC"
  },
  { debug: true }
);

//routers
const users = require("./routers/api/users");
const profiles = require("./routers/api/profiles");
const email = require("./routers/api/email");
const upload = require("./routers/api/upload");
const phone = require("./routers/api/phone");
//set storage engine

const app = express();

// Public folder
app.use(express.static(path.join(__dirname, "public")));

//bodyParser MiddleWare

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());

//Passport Config  JWT Strategy
require("./config/passport")(passport);

//db config
const db = require("./config/keys").mongoDB;
//connect to mongoDB

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to mongoDB"))
  .catch(err => console.log(err));

//Use routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/email", email);
app.use("/api/uploads", upload);
app.use("/api/phone", phone);

// Server Static Assets while in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server running on port${port}`)
);

// Connect to socket.io
<<<<<<< HEAD
const io = socketio(server);
app.set("io", io);
=======
const io = require("socket.io")(server);
app.io = io;
>>>>>>> ca88cddba95ae61ba89eff2b8e4be187b3c2e6a6

io.on("connection", socket => {
  console.log("connected to server socket", socket.id);
  io.on("disconnect", () => {
    console.log("disconnected");
  });
});

app.use((req, res, next) => {
  res.locals["socketio"] = io;
  next();
});
