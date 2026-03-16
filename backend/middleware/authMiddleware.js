const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded.userId;

      next();
    } catch (err) {
      console.error("Not authroized:", err.message);
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
