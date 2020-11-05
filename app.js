var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const indexRoute = require("./routes/index");

//set template engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./public/assets/"));
app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
  }),
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  }),
);

app.get("/", function (req, res) {
  res.redirect("/home");
});

app.use(indexRoute);

app.get("*", function (req, res) {
  res.redirect("/error/404");
});

//listen to port
app.listen(3000);
console.log("your app is listening at localhost:3000/");
