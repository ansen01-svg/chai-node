const asyncHandler = require("../../utils/asyncHandler");
const User = require("../../models/user.model");
const ApiResponse = require("../../utils/apiResponse");

const logout = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, _, "Logged out successfully"));
});

module.exports = logout;
