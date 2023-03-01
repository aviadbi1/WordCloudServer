require("dotenv").config();
const express = require("express");
const ClassSampler = require("./classSampler");

const classSampler = new ClassSampler();

const app = express();

app.get("/sampleClasses", (req, res) => {
  console.log("Got request");
  const wordCloud = classSampler.generateWordCloud();
  res.send(wordCloud);
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3001, function () {
  console.log("web server listening on port 3001");
});
