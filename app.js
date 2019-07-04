
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local')
const Camp = require('./models/camp')
const Comment = require('./models/comment')
const User = require('./models/user')
const seedDB = require('./seed.js')
const commentRoutes = require('./routes/comments')
const campRoutes = require('./routes/camps')
const indexRoutes = require('./routes/index')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({	extended: true }))

// seed the database
seedDB()

// passport configuration
app.use(require('express-session')({
  secret: 'abcde',
  resave: false,
  saveUnitialize: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// middleware
app.use(function (req, res, next) {
  res.locals.curUser = req.user
  next()
})

// routing
app.use('/', indexRoutes)
app.use('/camps', campRoutes)
app.use('/camps/:id/comments', commentRoutes)

app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log('app started')
})
