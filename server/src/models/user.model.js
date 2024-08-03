const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({});

// encrypt password
userSchema.pre("save", async function () {});

// compare password
userSchema.methods.comparePassword = async function (incomingPassword) {};

// generate accessToken
userSchema.methods.generateAccessToken = function () {};

// generate refreshToken
userSchema.methods.generateRefreshToken = function () {};

const User = mongoose.model("User", userSchema);

module.exports = User;
