const FacebookStrategy = require("passport-facebook");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const clientID = "991632717694701",
  clientSecret = "c27d128965b5b2a146d6c906d93da299",
  callbackURL = "http://localhost:3000/auth/facebook/callback";

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID,
        clientSecret,
        callbackURL
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile);

        User.findOne({ "facebook.id": profile.id })
          .then(user => {
            console.log(profile.id);

            if (user) {
              return cb(null, user);
            }
            return cb(null, false);
          })
          .catch(err => console.log(err));
      }
    )
  );
};
