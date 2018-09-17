const passport = require('passport')
const User = require('../models/User')
const FacebookStrategy = require('passport-facebook')

//local startegy
passport.use(User.createStrategy())

//FACEBOOK
passport.use(new FacebookStrategy({
  clientID: '337780620124598',
  clientSecret: '711abeb7f479d687ddc19cf4affd49d3',
  callbackURL: "http://localhost:3000/facebook/callback"
},
(accessToken, refreshToken, profile, cb)=>{
  //User.Create({ email: profile.id }, (err, user)=>{
    //return cb(err, user)
  //})
  console.log(profile)
}
));

//Serialize user 
passport.serializeUser(function(user,cb){
  cb(null,user)
})

//Deserialize user
passport.deserializeUser(function(user,cb){
  cb(null,user)
}) 

module.exports = passport