const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let userModel = require("../model/user");

const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await userModel.findOne({ _id: userId });
    res.send(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const register = async (req, res) => {
  let newuser = req.body;
  try {
    let saveuser = await userModel.create(newuser);
    res.send(saveuser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Enter email and password !!" });
  } else {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "invalid Email or Password" });
    } else {
      let isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        let token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.secret,
          { expiresIn: "1Hrs" }
        );
        res.status(200).send({ user: user, token: token });
      } else {
        res.status(401).send({ message: "invalid Email or Password" });
      }
    }
  }
};

module.exports = { getAllUsers, getUserById, register, login };
