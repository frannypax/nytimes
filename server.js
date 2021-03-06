var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var axios = require("axios")

var Article = require("./models/Article");

//connecting to server
var app = express();
var PORT = process.env.PORT || 8000;

//setting up morgan for logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json( {type: "application/vnd.api+json"}));

//html
app.use(express.static("./public"));

//db connection
// mongoose.connect("mongodb://localhost/nytimes");
// mongoose.connect("mongodb://admin:password@ds163796.mlab.com:63796/nytimessearch");
// var db = mongoose.connection;

if(process.env.NODE_ENV == "production"){
	mongoose.connect("mongodb://admin:password@ds163796.mlab.com:63796/nytimessearch")
} else{
	mongoose.connect("mongodb://localhost/nytimes")
}
var promise = mongoose.connect("mongodb://localhost/nytimes", {
	useMongoClient: true
});



promise.on("error", function(err){
	console.log("DB error: "+ err);
});

promise.once("openUri", function(){
	console.log("Connection successful")
});

app.get("/", function(req, res){
	res.sendFile("./public/index.html");
});
app.get("/api/saved", function(req, res){
	Article.find({})
		.exec(function(err, doc){
			if(err){
				console.log("Error: "+ err);
			}
			else{
				res.send(doc);
			}
		})
});

app.post("/api/saved", function(req, res){
	var newArticle = new Article({
		title: req.body.title,
		date: req.body.date,
		url: req.body.url
	});

		newArticle.save(function(err, doc){
		if(err){
			console.log("Error :"+ err);
			res.send(err);
		}else{
			res.json(doc);
		}
  	});
});

app.delete("/api/saved/:id", function(req, res){
	Article.find( { "_id": req.params.id}).remove()
		.exec(function(err, doc){
			res.send(doc);
		});
});

app.listen(PORT, function(){
	console.log("App is listening on PORT: " + PORT)
})

