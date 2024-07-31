const express = require("express");
const path = require("path");
const userModel = require("./Models/User");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  let user = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  res.redirect(`/user/${user._id}`);
  console.log(user);
});

app.get("/user/:id", async (req, res) => {
  let user = await userModel.find({ _id: req.params.id });
  res.render("user", { user });
});

app.listen(3000);
