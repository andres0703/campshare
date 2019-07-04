
const express = require("express");
const router  = express.Router({mergeParams: true});
const Camp    = require("../models/camp");
const Comment = require("../models/comment");

router.post("/", isLoggedIn, function(req, res) {
    Camp.findById(req.params.id, function(err, campFound) {
        if (err) {
            redirect("/camps");
        } else {
            Comment.create(req.body.comment, function(err, commentCreated) {
                campFound.comments.push(commentCreated);
                campFound.save();
                res.redirect("/camps/" + campFound._id);
            });
        }
    })
});

router.get("/", function(req, res) {
});

router.get("/new", isLoggedIn, function(req, res) {
  Camp.findById(req.params.id, function(err, campFound) {
      res.render("comments/new", {camp: campFound});
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next;
  }
  res.redirect("/login");
}

module.exports = router;
