var express = require('express');
var router = express.Router();
const User = require('../models/userModel')

const passport = require('passport')
const localStrategy = require('passport-local')

passport.use(new localStrategy(User.authenticate()))

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',(req,res)=>{
  res.render('authenticate')
})

router.post('/signup',async(req,res)=>{
  try{
    const {name,username,email,password} = req.body
    await User.register({name,username,email},password)
    res.redirect('/users/register')
  }catch(err){
    res.send(err)
  }
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/book/create',
  failureRedirect:'/users/register'
}),(req,res)=>{})




module.exports = router;
