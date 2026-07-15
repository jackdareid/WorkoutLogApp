const AppError = require("../errors/AppError");

const handleError = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

module.exports = handleError;
