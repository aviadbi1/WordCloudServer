require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ClassSampler = require("./classSampler");
const ClassParser = require("./classParser");
const ClassExtracter = require("./classExtracter");

const classSampler = new ClassSampler();
const classParser = new ClassParser();
const classExtracter = new ClassExtracter(classSampler, classParser);

const app = express();
app.use(cors());

app.get("/sampleClasses", async (req, res) => {
  try {
    console.log("got request");
    const wordCloud = await classExtracter.generateWordCloud();
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
