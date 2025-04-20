const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "User creation failed", error: err });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
