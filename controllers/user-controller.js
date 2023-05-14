const db = require("../models");
const { User } = db;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_SECRET;

const responseMessage = (data) => {
  return {
    message: "success",
    result: data,
  };
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_TOKEN,
      {
        expiresIn: "2h",
      }
    );
    console.log("token", token);

    user.token = token;
    await user.save();

    res.status(200).json(
      responseMessage({
        email: user.email,
        token,
      })
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.register = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password && !email) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const oldUser = await User.findOne({
      where: {
        email,
      },
    });

    if (oldUser) {
      return res
        .status(200)
        .json({ message: "User already exist. Please login." });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log("encryptedPassword", encryptedPassword);

    const user = await User.create({
      password: encryptedPassword,
      email: email.toLowerCase(),
    });
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_TOKEN,
      {
        expiresIn: "2h",
      }
    );
    console.log("token", token);

    user.token = token;
    console.log("user", user);
    await user.save();

    res.status(200).json({
      message: "User created successfully",
      result: user,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ error: err });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(responseMessage(user));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
