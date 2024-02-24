const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require('../models/user');

// configuring Passport!
passport.use(
  new GoogleStrategy(
    //configuration object, we need to tell google its out app
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
  //the verify callback function that gets called everytime a user logs in
  async function (accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up

    //search the database for users profile
    //if we find a user with a profile.id that matches a users googleId
      let user = await UserModel.findOne({ googleId: profile.id });
    //if not user is found user would undefined
      if (user) return cb(null, user)
    //that means the user exists and pass the users infromation to the next function in the middleware chain
    //if the user doesn't exist create the user then pass the user's information to the next function in the middleware chain
    //cb means callback
      try {
          user = await UserModel.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value
        })

        cb(null, user) //pass the created user to next place in the middleware chain
      } catch (err) {
        return cb(err);
      }
    }
  )
);
//this function is called after the verfity callback above
//it is the second function after the user logs in
//its job is to take the userDocument (user) and add the id of the user to session cookie
passport.serializeUser(function (user, cb) {
  try {
      cb(null, user._id)
      } catch(err){
        cb(err)
      }
});
//one every http request when the user is logged in, we need to open the cookie, get the user mongdodb._id
//then attach the users dociument to the req.user, so our controller functions knows who is making the http request
passport.deserializeUser(async function (userId, cb) {
  try {
    const userDoc = await UserModel.findById(userId)
    cb(null, userDoc); //this line attaches the userDoc to the req.user
    //req.user = userDoc
  } catch(err){
    cb(err)
  }
});



