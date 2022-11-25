const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash");
const { functions } = require("lodash");

mongoose.connect(
  "mongodb+srv://admin-igmtink:alitabalno17@cluster0.cgdwmic.mongodb.net/blogDB"
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const postSchema = new mongoose.Schema({ title: String, status: String });

const Post = new mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, foundItem) {
    res.render("index", { timeline: foundItem });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/post/:topic", function (req, res) {
  const topic = _.lowerCase(req.params.topic);

  Post.find({}, function (err, foundItem) {
    foundItem.forEach(function (post) {
      if (topic === _.lowerCase(post.title)) {
        res.render("post", { title: post.title, status: post.status });
      }
    });
  });
});

app.post("/compose", function (req, res) {
  const status = new Post({
    title: req.body.titleInput,
    status: req.body.statusInput,
  });
  status.save();

  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const itemTitle = req.body.deleteBtn;

  Post.findOneAndDelete({ title: itemTitle }, function (err, foundItem) {
    res.redirect("/");
  });
});

app.listen(port, function () {
  console.log(`Server running at port: ${port}`);
});
