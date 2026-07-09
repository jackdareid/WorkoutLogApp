const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/index.js");
const {
  getLoginInfo,
  getUserById,
} = require("../db/queries/retrievalQueries.js");
const { createUser } = require("../db/queries/inputQueries.js");

const SALT_ROUNDS = 10;

const createToken = (id) => {
  return jwt.sign({ user_id: id }, config.auth.jwtSecret, {
    expiresIn: config.auth.jwtExpiresIn,
  });
};

/*
 * This function logs a user in and returns all of their info minus their password.
 *
 * Tested: False
 *
 * Accepts: req and res
 *
 * Returns: json user data
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getLoginInfo(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const verify_user = await bcrypt.compare(password, user.password_hash);

    if (verify_user) {
      const { password_hash, ...user_data } = user;
      const token = createToken(user.user_id);

      return res
        .status(200)
        .json({ message: "Login successful", token, data: user_data });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/*
 * This function signs a user up with the f_name, l_name, email, and password.
 *
 * Tested: False
 *
 * Accepts: req and res
 *
 * Returns: user instance
 */
const signupUser = async (req, res) => {
  const { f_name, l_name, email, password } = req.body;

  try {
    const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);
    const obj = await createUser(f_name, l_name, email, hashed_password);

    const token = createToken(obj.user_id);

    return res
      .status(201)
      .json({ message: "Successfully created user!", token, data: obj });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already in use" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMe = async (req, res) => {
  try {
    const user_id = req.user_id;
    console.log("User ID:", user_id);

    // Get user info from user_id
    const user = await getUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password_hash, ...user_data } = user;

    return res.status(200).json({ data: user_data });
  } catch (err) {
    console.error("Error in getMe controller:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getMe,
};
