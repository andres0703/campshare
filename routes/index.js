var express = require('express')
var router = express.Router({mergeParams: true})
var Camp = require('../models/camp')
var Comment = require('../models/comment')
var User = require('../models/user');
var passport = require('passport')
var flash = require('connect-flash')

router.get('/', function (req, res) {
  res.render('homepage')
})

router.get('/register', function (req, res) {
  res.render('register')
})

router.post('/register', function (req, res) {
  var newUser = new User({ username: req.body.username})
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash('message', err.message)
      console.log(err)
      res.render('register', {message: req.flash('message')})
    } else {
      passport.authenticate('local')(req, res, function () {
        req.flash('message', 'Welcome to Campshared ' + user.username),
        res.redirect('/camps')
      })
    }
  })
})

router.get('/login', function (req, res) {
  res.render('login', {message: req.flash('message')})
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/camps',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/logout', function (req, res) {
  req.logout()
  req.flash('message', 'Logged you out!')
  res.redirect('/camps')
})

module.exports = router
