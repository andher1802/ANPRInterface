var express = require("express");
var couchbase = require("couchbase");
var path = require("path");
var config = require("./config");
var app = express();
 
var bodyParser = require('body-parser');

var server = require("http").Server(app);
var io = require("socket.io").listen(server);

module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);
 
app.use(bodyParser.json());                                                                                                                
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

var routes = require("./routes/routes.js")(app);
app.all('*', function (req, res){res.status(200).sendFile(path.join(__dirname, 'public/index.html'))});
app.use("/scripts", express.static(__dirname + "/node_modules/"));

var userModel = require("./models/user.model");

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("signup-user", function(msg){
		userModel.save(msg);
  });
});

server.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});