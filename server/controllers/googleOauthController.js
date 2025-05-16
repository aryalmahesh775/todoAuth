const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const model = require("../models");
const { generateUUID } = require("../utils/generateUUID");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log('google-Profile ==>',profile)
      const id = generateUUID();
      const { emails, displayName, photos } = profile;
      try {
        let user = await model.User.findOne({
          where: {
            email: emails[0].value,
          },
        });

        if (user) {
          if (!user.profileImage) {
            user.profileImage = photos[0]?.value;
            await user.save();
          }
          return done(null, user);
        }

        user = await model.User.create({
          id,
          name: displayName,
          email: emails[0].value,
          profileImage: photos[0]?.value,
          isverified: emails[0].verified,
        });
        done(null, user);
      } catch (error) {
        console.log("Error in Google Strategy", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await model.User.findByPk(id);
    done(null, user);
  } catch (error) {
    console.log("Error in deserializing user", error);
    done(error, null);
  }
});
