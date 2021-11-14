const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/login");
const password = require("./routes/password");
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
// app.use("./public/assets", express.static(__dirname + '/public/assets'));
 app.use("/user", user);
//  app.use(express.static('./public/assets'));
// app.use(express.static(__dirname + '/public'));
 app.use("/password", password);
//  app.use(express.static(__dirname+'/public/assets/css'));
// app.use(express.static('/public/assets/css'));
app.use('/user',express.static("./public"));
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
app.get('/', function(req, res){
   res.sendFile(__dirname + '/public/dashboard.html');
});