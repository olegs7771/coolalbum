const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

module.exports = passport_facebook => {
  const FACEBOOK_APP_ID = "991632717694701",
    FACEBOOK_APP_SECRET = "c27d128965b5b2a146d6c906d93da299";

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/api/users/currentfb"
      },
      (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({ facebookId: profile.id }, (err, user) => {
          console.log(accessToken);

          return cb(err, user);
        });
      }
    )
  );
};
