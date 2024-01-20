const authService = require("../services/AuthService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await authService.getUserByEmail({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      user.token = token;

      return res.status(200).json(user);
    }
    return res.status(400).json({ error: "Invalid Credential" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(email && password && username)) {
      res.status(400).json({ error: "All fields Are required" });
    }

    const oldUser = await authService.getUserByEmail({ email });

    if (oldUser) {
      return res.status(409).json({ error: "User Already Exists" });
    }

    encryptedUserPassword = await bcrypt.hash(password, 10);

    const data = {
      username: username,
      email: email.toLowerCase(),
      password: encryptedUserPassword,
    };
    const user = await authService.createUser(data);

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
