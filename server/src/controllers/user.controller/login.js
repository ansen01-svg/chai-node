const User = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/apiErrors");
const ApiResponse = require("../../utils/apiResponse");
const generateAccessAndRefreshTokens = require("../../utils/generateAccessAndRefreshTokens");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(401, "Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "User does not exist");
  }

  const passwordIsCorrect = await user.comparePassword(password);

  if (!passwordIsCorrect) {
    throw new ApiError(401, "Incorrect password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const currentUser = await User.findById({ _id: user._id }).select(
    "-password -refreshToken"
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, currentUser, "Logged in successfully"));
});

module.exports = login;
