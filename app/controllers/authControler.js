const User = require("../models/authModel");
const gError = (res, error) => {
  res.status(500).json({
    message: "Failed to save skill",
    error: error.message,
  });
};
const Signup = async (req, res) => {
  try {
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    await user.save();

    res.status(200).json({
      message: "Signup success fully",
    });
  } catch (error) {
    gError(res, error);
  }
};
const Login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = User.findOne({ email: email });

    res.status(200).json({
      message: "Logged In Successfully",
    });
  } catch (error) {
    gError(res, error);
  }
};

module.exports = { Signup, Login };
