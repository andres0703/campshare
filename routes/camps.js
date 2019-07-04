const express = require('express')
const router = express.Router({mergeParams: true})
const Camp = require('../models/camp')
const Comment = require('../models/comment')

router.get('/', function (req, res) {
  Camp.find({}, function (err, allCamps) {
			  if (err) {
				  	console.log('Error fetching camps from database.')
					  console.log(err)
  } else {
    allCamps.forEach(function (camp) {
      console.log(camp.id)
    })
					  res.render('camps/index', {campgrounds: allCamps})
  }
  })
})

router.post('/', function (req, res) {
  var name = req.body.name
  var imageUrl = req.body.image
  var desc = req.body.description

  var newcamp = {name: name, image: imageUrl, description: desc}
  if (imageUrl != null) {
    Camp.create(newcamp, function (err, newlyCreated) {
				    if (err) {
							  console.log('Error creating database record: ')
						    console.log(err)
    } else {
					      console.log('a new camp created')
						    res.redirect('/camps')
    }
    })
  };
})

router.get('/camps/new', function (req, res) {
  res.render('camps/newcamp')
})

router.get('/:id', function (req, res) {
  Camp.findById(req.params.id).populate('comments').exec(function (err, foundCamp) {
			  if (err) {
					  console.log(err)
  } else {
    res.render('camps/show', {campground: foundCamp })
  }
  })
})

module.exports = router
