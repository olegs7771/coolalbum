if (process.env.NODE_ENV === "production") {
  module.exports = require("./configureStore.prod");
  console.log("production");
} else {
  module.exports = require("./configureStore.dev");
  console.log("development");

  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
}
