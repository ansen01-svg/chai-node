const User = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/apiErrors");
const ApiResponse = require("../../utils/apiResponse");

const getAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

module.exports = getAvatar;
