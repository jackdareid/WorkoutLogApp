const {
  getLoginInfo,
  getUserData,
} = require("../db/queries/retrievalQueries.js");

const comparePassword = async (password, password_hash) => {
  return password === password_hash;
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getLoginInfo(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const unlock = await comparePassword(password, user.password_hash);

    // Success!
    if (unlock) {
      // Return user data
      const { password_hash, ...user_data } = user;
      return res.json({ message: "Login successful", data: user_data });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error authenticating user");
  }
};

const mockReq = {
  body: {
    email: "testy@gmail.com",
    password: "fake_password!",
  },
};

const mockRes = {
  // We mock the status and json methods so the code doesn't crash
  status: function (code) {
    console.log("Status:", code);
    return this;
  },
  json: function (data) {
    console.log("Response JSON:", data);
    return this;
  },
  send: function (msg) {
    console.log("Response Msg:", msg);
    return this;
  },
};

const res = loginUser(mockReq, mockRes);
console.log(res);
