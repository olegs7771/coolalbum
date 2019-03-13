const FacebookStrategy = require("passport-facebook");

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
        User.findOrCreate({ facebookId: profile.id }, function(err, user) {
          return cb(err, user);
        });
      }
    )
  );
};
