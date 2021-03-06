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

  passport.use(
    new FacebookTokenStrategy(
      {
        clientID,
        clientSecret
      },

      (accessToken, refreshToken, profile, cb) => {
        User.findOne({ email: profile.emails[0].value })
          .then(user => {
            if (user) {
              return cb(null, user);
            } else {
              const newUser = new User();
              newUser.id = profile.id;
              newUser.name = profile.displayName;
              newUser.email = profile.emails[0].value;
              newUser.avatar = profile.photos[0].value;
              newUser.confirmed = true;
              newUser.location = "";
              newUser.createdAt = null;

              newUser
                .save()
                .then(user => {
                  if (user) {
                    return cb(null, user);
                  }
                })
                .catch(err => console.log(err));
            }
          })
          .catch(err => console.log("err", err));
      }
    )
  );
};
