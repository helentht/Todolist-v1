const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",
    month: "long",
    day: "numeric"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {listTitle: day, newItems: items});

});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  let listType = req.body.list;

  if (listType === 'Work') {

    workItems.push(item);
    res.redirect("/work");

  } else {

    items.push(item);
    console.log(req.body);
    res.redirect("/");

  }

})

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newItems: workItems});
})

app.listen(3000, function(req, res) {
  console.log("Server is running on 3000.");
})
