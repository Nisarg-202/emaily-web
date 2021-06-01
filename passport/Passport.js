const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const keys = require('../config/keys');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.clientId,
      clientSecret: keys.clientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      await User.findOne(
        {
          googleId: profile.id,
        },
        async function (err, found) {
          if (err) {
            console.log(err);
          } else {
            if (found) {
              done(null, found);
            } else {
              const newUser = new User({
                googleId: profile.id,
              });
              await newUser.save();
              done(null, newUser);
            }
          }
        }
      );
    }
  )
);
