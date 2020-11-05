const express = require("express");
var request = require("request");
var router = express.Router();
const creds = require("../lib/index");
router.get("/home", function (req, res) {
  res.render("mainpage", { data: "", weather: "" });
});
router.post("/weatherinfo", function (req, res) {
  console.log(
    JSON.stringify(req.body) +
      "req.body is ***********************************",
  );
  var city = req.body.city;
  console.log("City is " + city );
  var options = {
    method: "GET",
    url: creds.url + city + creds.appId,
    headers: {},
  };

  request(options, function (error, response) {
    if (response.statusCode == 404) {
      console.log("came in error");
      res.json({
        message:
          "Please make sure you have entered correct city and country code",
      });
    } else {
      console.log(response.body + "response.body");
      res.json({
        data: req.body,
        weather: JSON.parse(response.body)
      });
    }
  });
});

module.exports = router;
