const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("My first project in Applause");
});

app.listen(8000);
