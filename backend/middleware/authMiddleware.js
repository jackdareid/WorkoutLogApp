const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;
  console.log("Here");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded: ", decoded);
      req.user_id = decoded.user_id;

      return next();
    } catch (err) {
      console.error("Not authorized:", err.message);
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
