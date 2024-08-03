const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  };
};

module.exports = asyncHandler;
