var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({	extended: true }));

app.get("/", function(req, res) {
    res.render("homepage");
});

app.get("/camps", function(req, res) {
    var campgrounds = [
        {name: "camp A", image: "https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/pass/iStock-820873602.jpg"},
        {name: "camp B", image: "https://images.wilderness-safaris.com/uploads/medium/file/1723/small_focal_0903-kwetsani-camp.jpg"},
        {name: "camp C", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
			  {name: "camp D", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg"},
			  {name: "camp E", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0kp60ncXnIGArUpS_Nc6KA68aG7X-Bbtz0q-Djot_nT7yDa5V"}];

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/camps", function(req, res) {
    var name = req.body.name;
    var imageUrl = req.body.image;

    var newcamp = {name: name, image: imageUrl}
    res.render("newCampAdded", {newcamp: newcamp});
});

app.get("/camps/new", function(req, res) {
    res.render("newcamp");
});

app.listen(process.env.PORT || 5000, process.env.IP, function() {
    console.log("app started");
});
