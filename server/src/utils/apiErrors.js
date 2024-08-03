class ApiError extends Error {
  constructor(statusCode, message = "An error occured") {
    super(message);
    this.statusCode = statusCode;
    // this.message = message;
    this.data = null;
    this.success = false;
  }
}

module.exports = ApiError;
