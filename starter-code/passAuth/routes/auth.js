const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')

router.get('/',(req,res,next)=>{
  res.render('index')
})
router.get('/signup',(req,res,next)=>{
  res.render('auth/signup')
})

router.post('/signup',(req,res,next)=>{
  User.register(req.body,req.body.password)
  .then(user=>{
    //El usuario ya se creo
    res.redirect('/login')
  })
  .catch(e=>{
    next(e)
  })
})

router.get('/login',(req,res,next)=>{
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local'),(req,res,next)=>{
  //Si el usuario si existe y se loggeo bien
  console.log(req.user)
  res.redirect('/profile')
})

router.get('/logout',(req,res)=>{
  req.logOut()
  res.redirect('/')
})

const isAuthenticate = (req,res,next)=>{
  if(req.isAuthenticated()){
    return next()
  } else{
    res.redirect('/login')
  }
}

router.get('/profile',isAuthenticate,(req,res,next)=>{
  res.send(req.user.email)
})

router.get('/facebook',passport.authenticate('facebook'))

router.get('/facebook/callback',passport.authenticate('facebook'),(req,res,next)=>{
  res.send('Awiwi si funciono')
})

module.exports = router