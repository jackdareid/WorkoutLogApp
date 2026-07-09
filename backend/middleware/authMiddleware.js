const jwt = require("jsonwebtoken");
const config = require("../config");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, config.auth.jwtSecret);
      req.user_id = decoded.user_id;

      return next();
    } catch (err) {
      res.status(401).json({
        message: "Not authorized, token failed.",
        error: err.message,
      });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided." });
  }
};

module.exports = { protect };
