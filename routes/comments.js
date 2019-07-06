
const express = require('express')
const router = express.Router({mergeParams: true})
const Camp = require('../models/camp')
const Comment = require('../models/comment')

router.post('/', isLoggedIn, function (req, res) {
  Camp.findById(req.params.id, function (err, campFound) {
    if (err) {
      redirect('/camps')
    } else {
      Comment.create(req.body.comment, function (err, commentCreated) {
        commentCreated.author.id = req.user._id;
        commentCreated.author.username = req.user.username;
        commentCreated.save()
        campFound.comments.push(commentCreated)
        campFound.save()
        res.redirect('/camps/' + campFound._id)
      })
    }
  })
})

router.get('/', function (req, res) {
})

router.get('/new', isLoggedIn, function (req, res) {
  Camp.findById(req.params.id, function (err, campFound) {
    res.render('comments/new', {camp: campFound})
  })
})

router.get('/:comment_id/edit', checkCommentOwner, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, commentFound) {
    if (err) {
      console.log(err)
    } else {
      res.render("comments/edit", {camp_id: req.params.id, comment: commentFound});
    }
  })
})

router.put('/:comment_id', checkCommentOwner, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err) {
    if (err) {
      console.log(err)
    }
  })
  res.redirect('/camps/' + req.params.id)
})

router.delete('/:comment_id', checkCommentOwner, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      console.log("Delete error")
      res.redirect('/camps/' + req.params.id)
    } else {
      res.redirect('/camps/' + req.params.id)
    }
  })
})

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkCommentOwner(req, res, next) {
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
    res.redirect("/login")
  }
}

module.exports = router
