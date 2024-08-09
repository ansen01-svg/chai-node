const User = require("../models/user.model");
const ApiError = require("../utils/apiErrors");

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById({ _id: userId });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(501, "Error while generating access and refresh tokens");
  }
};

module.exports = generateAccessAndRefreshTokens;
