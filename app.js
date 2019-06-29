
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./config/keys");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({	extended: true }));
mongoose.connect(keys.mongoUri, { useNewUrlParser: true });

var campSchema = new mongoose.Schema({
	  name: String,
		image: String,
		description: String
});
var camp = mongoose.model("camp", campSchema);

app.get("/", function(req, res) {
    res.render("homepage");
});

app.get("/camps", function(req, res) {
    camp.find({}, function(err, allCamps) {
			  if (err) {
				  	console.log("Error fetching camps from database.");
					  console.log(err);
				} else {
					  res.render("index", {campgrounds: allCamps});
				}
		})
});

app.post("/camps", function(req, res) {
    var name = req.body.name;
    var imageUrl = req.body.image;
		var desc = req.body.description;

    var newcamp = {name: name, image: imageUrl, description: desc};
		if (imageUrl != null) {
				camp.create(newcamp, function(err, newlyCreated) {
				    if (err) {
							  console.log("Error creating database record: ");
						    console.log(err);
						} else {
					      console.log("a new camp created");
						    res.redirect("/camps");
						}
				});
		};
});

app.get("/camps/new", function(req, res) {
    res.render("newcamp");
});

app.get("/camps/:id", function(req, res) {
    camp.findById(req.params.id, function(err, foundCamp) {
			  if (err) {
					  console.log(err);
				} else {
					  res.render("show", {camp: foundCamp });
				}
		})
});

app.listen(process.env.PORT || 5000, process.env.IP, function() {
    console.log("app started");
});
