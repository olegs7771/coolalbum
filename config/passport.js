const keys = require("./dev_keys").secredOrKey;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const FacebookTokenStrategy = require("passport-facebook-token");
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
    clientSecret = "c27d128965b5b2a146d6c906d93da299";
  // callbackURL = "http://localhost:3000/api/users/auth/facebook/callback";

  passport.use(
    new FacebookTokenStrategy(
      {
        clientID,
        clientSecret
      },

      (accessToken, refreshToken, profile, cb) => {
        console.log(profile);

        User.findOne({ "facebook.id": profile.id }),
          (err, user) => {
            if (err) {
              return cb(err);
            }
            if (user) {
              return cb(null, user);
            }
            //no user then save newUser
            const newUser = new User();
            (newUser.facebook.id = profile.id), newUser.facebook;
          };
      }
    )
  );
};
