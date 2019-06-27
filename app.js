var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("homepage");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("app started");
});

app.get("/camps", function(req, res) {
    var campgrounds = [
        {name: "camp A", image: "https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/pass/iStock-820873602.jpg"},
        {name: "camp B", image: "https://images.wilderness-safaris.com/uploads/medium/file/1723/small_focal_0903-kwetsani-camp.jpg"},
        {name: "camp C", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"}]
        
    res.render("campgrounds", {campgrounds: campgrounds});
});