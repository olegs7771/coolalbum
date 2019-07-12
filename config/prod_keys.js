module.exports = {
  mongoDB: process.env.MONGO_URI,
  secredOrKey: process.env.SECRET_KEY,
  mailPass: process.env.MAIL_PASS
};
// console.log("process.env.MONGO_URI prod", process.env.MONGO_URI);
