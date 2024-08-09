const User = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/apiErrors");
const ApiResponse = require("../../utils/apiResponse");
const uploadToCloudinary = require("../../utils/upload_to_cloudinary");

const addAvatar = asyncHandler(async (req, res) => {
  const { avatar } = req.file;
  console.log(avatar);
  if (!avatar) {
    throw new ApiError(401, "Please provide avatar");
  }

  const user = await User.findById({ _id: req.user._id }).select(
    "-password -refreshToken"
  );

  const response = await uploadToCloudinary(avatar);
  console.log("add avatar controller", response);

  if (!response) {
    throw new ApiError(401, "Invalid avatar");
  }

  user.avatar = response.url;
  await user.save({ validateBeforeSave: true });

  return res
    .status(201)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

module.exports = addAvatar;
