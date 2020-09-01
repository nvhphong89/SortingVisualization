var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


// routes
app.use("/",indexRouter);

app.listen(8000, function(){
	console.log("Server is running!");
});
