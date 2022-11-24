const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const _ = require("lodash");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const timeline = [];

app.get("/", function (req, res) {
  res.render("index", { timeline: timeline });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/post/:topic", function (req, res) {
  const topic = _.lowerCase(req.params.topic);

  timeline.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (topic === storedTitle) {
      res.render("post", { title: post.title, status: post.status });
    }
  });
});

app.post("/compose", function (req, res) {
  const post = { title: req.body.titleInput, status: req.body.statusInput };

  timeline.push(post);

  res.redirect("/");
});

app.listen(port, function () {
  console.log(`Server running at port: ${port}`);
});
