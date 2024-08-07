const User = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/apiErrors");
const ApiResponse = require("../../utils/apiResponse");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (["username", "email", "password"].some((field) => field.trim() === "")) {
    throw new ApiError(401, "Please provide all the fields");
  }

  const registeringUser = await User.find({
    $or: [{ username }, { email }],
  });

  if (registeringUser) {
    throw new ApiError(401, "User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById({ _id: user._id });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

module.exports = register;
