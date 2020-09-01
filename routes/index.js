var express = require("express");
var routers = express.Router();


//routes
routers.get("/", function(req,res){
	res.render("home");
});

module.exports = routers;