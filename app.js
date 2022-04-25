const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render("list", {listTitle: day, newItems: items});

});

app.post("/", function(req, res) {
  const item = req.body.newItem;
  const listType = req.body.list;

  if (listType === 'Work') {

    workItems.push(item);
    res.redirect("/work");

  } else {

    items.push(item);
    res.redirect("/");

  }

})

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newItems: workItems});
})

app.get("/about", function(req, res) {
  res.render("about");
})

app.listen(3000, function(req, res) {
  console.log("Server is running on 3000.");
})
