const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
require("dotenv").config();

//routers
const users = require("./routers/api/users");
const profiles = require("./routers/api/profiles");
const email = require("./routers/api/email");
const upload = require("./routers/api/upload");
const phone = require("./routers/api/phone");
const weather = require("./routers/api/weather");
const posts = require("./routers/api/posts");
const chat = require("./routers/api/chat");
const app = express();

//initiat session
//bring in secret key
// const sessionSecretKey = require("./config/keys").sessionSecret;

//define lifetime for session

// const TWO_HOURS = 1000 * 60 * 60 * 2;

// app.use(
//   session({
//     secret: sessionSecretKey,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true, maxAge: TWO_HOURS }
//   })
// );

// Public folder
app.use(express.static(path.join(__dirname, "public")));

//bodyParser MiddleWare

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//Passport Config  JWT Strategy
require("./config/passport")(passport);

//db config
const db = require("./config/keys").mongoDB;

//connect to mongoDB

mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log(`connected to ${db}`))
  .catch(err => console.log(err));

//Use routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/email", email);
app.use("/api/uploads", upload);
app.use("/api/phone", phone);
app.use("/api/weather", weather);
app.use("/api/posts", posts);
app.use("/api/chat", chat);

// Server Static Assets while in production
if (process.env.NODE_ENV === "production") {
  //   // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// console.log("process.env.PORT server ", process.env.PORT);
// console.log("process.env.NODE_ENV ", process.env.NODE_ENV);
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`App is listening on port ${port}`)
);

// Connect to socket.io
const connections = [];
const connected_users = [];

const io = require("socket.io")(server);
app.io = io;

io.on("connection", socket => {
  //show online user connected
  socket.on("new_user", name => {
    socket.broadcast.emit("online", name);
  });

  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);
  console.log("connected to server socket", socket.id);
  //show online
  io.sockets.emit("hi", socket.id);

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket));
    console.log("Disconnected: %s sockets connected", connections.length);
  });
});

app.use((req, res, next) => {
  res.locals["socketio"] = io;
  next();
});
