const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getLoginInfo } = require("../db/queries/retrievalQueries.js");
const { createUser } = require("../db/queries/inputQueries.js");

const SALT_ROUNDS = 10;

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
  console.log(`Looking for user with email: ${email}`);

  try {
    const user = await getLoginInfo(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const verify_user = await bcrypt.compare(password, user.password_hash);

    if (verify_user) {
      const { password_hash, ...user_data } = user;
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res
        .status(200)
        .json({ message: "Login successful", token: token, data: user_data });
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

    return res
      .status(201)
      .json({ message: "Succesfully created user!", data: obj });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already in use" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

// const mockReq = {
//   body: {
//     email: "testy@gmail.com",
//     password: "fake_password!",
//   },
// };
//
// const mockRes = {
//   // We mock the status and json methods so the code doesn't crash
//   status: function (code) {
//     console.log("Status:", code);
//     return this;
//   },
//   json: function (data) {
//     console.log("Response JSON:", data);
//     return this;
//   },
//   send: function (msg) {
//     console.log("Response Msg:", msg);
//     return this;
//   },
// };
//
// const res = loginUser(mockReq, mockRes);
// console.log(res);

module.exports = {
  loginUser,
  signupUser,
};
