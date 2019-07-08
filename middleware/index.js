
var Camp = require('../models/camp')
var Comment = require('../models/comment')

var middlewareObj = {}

middlewareObj.checkCampOwner = function (req, res, next) {
  if (req.isAuthenticated()) {
    Camp.findById(req.params.id, function(err, campFound) {
      if (err) {
        console.log(err)
      } else {
        if (campFound.author.id.equals(req.user.id)) {
          next()
        } else {
          res.redirect("/camps/" + req.params.id);
        }
      }
    })
  } else {
    req.flash('message', 'You\'re not authorized to do this!')
    res.redirect("/login")
  }
}

middlewareObj.checkCommentOwner = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, commentFound) {
      if (err) {
        console.log(err)
      } else {
        if (commentFound.author.id.equals(req.user.id)) {
          next()
        } else {
          res.redirect("/camps/" + req.params.id);
        }
      }
    })
  } else {
    req.flash('message', 'You\'re not authorized to do this!')
    res.redirect("/login")
  }
}

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('message', 'Please log in first!')
  res.redirect('/login')
}

module.exports = middlewareObj;
