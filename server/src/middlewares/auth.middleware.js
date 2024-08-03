const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiErrors");

const verifyJwt = async (token) => {
  try {
    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
    return verifiedToken;
  } catch (error) {
    console.error(error);
  }
};

const authMiddleware = async (req, _, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorised user");
  }

  const verifiedToken = await verifyJwt(token);

  if (!verifiedToken) {
    throw new ApiError(401, "Unauthorised user");
  }

  // find user with verifiedToken._id
  //attach user to req

  req.user = verifiedToken;
  next();
};

module.exports = authMiddleware;
