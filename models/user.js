const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/coursesdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const util = require("util");
const sgin = util.promisify(JWT.sign);
const verify = util.promisify(JWT.verify);

const jwtSecret = "bnnbnmm";
const saltRounds = 10;

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    isAdmin: {
      type: Boolean,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    confirmPassword: {
      type: String,
      required: true,
    },
  },
  {}
);

userSchema.pre("save", async function () {
  const userInstance = this;
  if (this.isModified("password")) {
    userInstance.password = await bcrypt.hash(
      userInstance.password,
      saltRounds
    );
  }
});

userSchema.methods.ComparePassword = function (plainPassword) {
  const userInstance = this;
  return bcrypt.compare(plainPassword, userInstance.password);
};
userSchema.methods.GetToken = function (err, token) {
  const userInstance = this;
  return sgin({ userId: userInstance.id }, jwtSecret);
};
userSchema.statics.verifyToken = async function (token) {
  const user = this;
  const payload = await verify(token, jwtSecret);
  const currentUser = await user.findById(payload.userId);
  if (!currentUser) throw new Error("User not found");
  return currentUser;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
