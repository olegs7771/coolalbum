module.exports = {
  mongoDB: process.env.MONGO_URI,
  secredOrKey: process.env.SECRET_KEY
};
console.log("process.env.MONGO_URI", process.env.MONGO_URI);
