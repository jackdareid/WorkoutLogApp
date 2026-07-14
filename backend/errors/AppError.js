// Holds shared info like message and statusCode

class AppError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
