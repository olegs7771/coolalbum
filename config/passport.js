const keys = require("./dev_keys").secredOrKey;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const FacebookStrategy = require("passport-facebook");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  //passport-facebook

  const clientID = "991632717694701",
    clientSecret = "c27d128965b5b2a146d6c906d93da299",
    callbackURL = "http://localhost:3000/auth/facebook/callback";

  passport.use(
    new FacebookStrategy(
      {
        clientID,
        clientSecret,
        callbackURL
      },
      (accessToken, refreshToken, profile, cb) => {
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
