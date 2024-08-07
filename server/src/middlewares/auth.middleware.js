const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiErrors");

const verifyJwt = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, "An error occured while veryfying jwt token");
  }
};

const authMiddleware = asyncHandler(async (req, _, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized user");
  }

  const verifiedToken = verifyJwt(token);

  if (!verifiedToken) {
    throw new ApiError(401, "Unauthorised user");
  }

  const user = await User.findById({ _id: verifiedToken._id });

  req.user = user;
  next();
});

module.exports = authMiddleware;
