let dbURL;
if ((process.env.NODE_ENV = "production")) {
  dbURL =
    "mongodb://olegs7777:olegs7777@ds139167.mlab.com:39167/coolalbum_production";
} else {
  dbURL = "mongodb://olegs777:olegs777@ds139435.mlab.com:39435/coolalbum";
}

module.exports = {
  mongoDB: dbURL,
  secredOrKey: "bubuna",
  mailPass: "5168335"
};
