var express = require("express");
var app = express();
var path = require("path");

// viewed at http://localhost:8080
app.use(
  "/scripts",
  express.static(__dirname + "/node_modules/bootstrap/dist/")
);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/barcode.html"));
});

app.listen(8080);
