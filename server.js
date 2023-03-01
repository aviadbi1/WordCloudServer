require("dotenv").config();
const express = require("express");
const ClassSampler = require("./classSampler");

const classSampler = new ClassSampler();

const app = express();

app.get("/sampleClasses", async (req, res) => {
  try {
    const wordCloud = await classSampler.generateWordCloud();
    res.status(200).send(JSON.stringify(wordCloud));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3001, function () {
  console.log("web server listening on port 3001");
});
