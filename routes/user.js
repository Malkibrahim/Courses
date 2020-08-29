const express = require("express");
const app = express();
const User = require("../models/user");
const router = express.Router();
const customError = require("../helpers/customErrors");

const validationChecks = require("../middlewares/validation");

const authentication = require("../middlewares/authentication");
const { check } = require("express-validator");
const admin = require("../middlewares/admin");
require("express-async-errors");

app.get("/", async (req, res, next) => {
  const users = await User.find({});
  res.json({
    message: "All Users",
    users,
  });
});

router.post("/register", async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const user = new User({ email, password, confirmPassword });
  if (password == confirmPassword) {
    try {
      await user.save();
      res.json({
        message: "user successfully registerd",
        user,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    throw err;
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw "mail is not found ";
  const isMatch = user.ComparePassword(password);
  if (!isMatch) throw customError("Wrong Password ", 404);

  const token = await user.GetToken();

  res.json({
    message: "Logged in successfully",
    user,
    token,
  });
});

router.get("/", async (req, res, next) => {
  const users = await User.find({});
  res.json({
    message: "all users ",
    users,
  });
});

router.get("/home", authentication, async (req, res, next) => {
  res.json({
    message: " authenticated user",
  });
});
// ----- admin routes---

router.delete("/admin/delete/:id", admin, async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete({ _id: id.id });
  res.json({
    message: "user deleted ",
    user,
  });
});

router.post("/admin", admin, async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const user = new User({ email, password, confirmPassword });
  if (password == confirmPassword) {
    user.isAdmin = true;
    try {
      await user.save();
      res.json({
        message: "user successfully registerd",
        user,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    throw err;
  }
});

module.exports = router;
