const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
        data: {},
        success: false,
      });
    }
  };
};

module.exports = asyncHandler;
