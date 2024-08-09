const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: [true, "This username is already taken"],
      trim: true,
      min: [3, "Username cannot be shorted than 3 letters"],
      max: [20, "Username cannot be longer than 20 letters"],
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcryptjs.genSalt(15);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// compare password
userSchema.methods.comparePassword = async function (incomingPassword) {
  return await bcryptjs.compare(incomingPassword, this.password);
};

// generate accessToken
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// generate refreshToken
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
