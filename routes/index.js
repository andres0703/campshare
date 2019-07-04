var express = require('express')
var router = express.Router({mergeParams: true})
var Camp = require('../models/camp')
var Comment = require('../models/comment')
var passport = require('passport')

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
      console.log('error')
      console.log(err)
    } else {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/camps')
      })
    }
  })
})

router.get('/login', function (req, res) {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/camps',
  failureRedirect: '/login'
}))

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
