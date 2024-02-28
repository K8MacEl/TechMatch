const router = require('express').Router();
const passport = require('passport');

//all of these routes are prepended with /customers becasue of this line of code in the server.js
//app.use('/customers, customerRouter)

// The root route renders our only view
router.get('/', function(req, res, next) {
  res.render('index', {title: "homepage"}) //FOR NOW CUSTOMERS, ONCE WE GET THIS WOKRING WE CAN PLAY AROUND WITH A HOMEPAGE IDEA
});

  //UPDATE THIS ==========================================================================
  // Where do you want to go for the root route (this is localhost:3000)
  // in the student demo this was res.redirect('/movies'), what do you want?
  // This could be a landing page, or just redirect to your main resource page which you'll have an a tag that makes 
  // a request to `/auth/google` route below
  //===============================================================================================

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/', // UPDATE THIS, where do you want the client to go after you login 
    failureRedirect : '/' //  UPDATE THIS, where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function(){ //< - req.logout comes from passport, and what it does is destorys the cookie keeping track of the user!
    res.redirect('/customers') // <---- UPDATE THIS TO WHERE YOU WANT THE USER TO GO AFTER LOGOUT
  })
})

module.exports = router;