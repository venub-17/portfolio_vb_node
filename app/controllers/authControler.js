const jwt = require("jsonwebtoken");
const User = require("../models/authModel");
const gError = (res, error) => {
  res.status(500).json({
    message: "Failed to save skill",
    error: error.message,
  });
};
const Signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(401).json({ message: "User already exists" });

    const adminEmail = "venuby95@gmail.com";
    const role = email === adminEmail ? "admin" : "user";
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: role,
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
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      isAdmin: user.role === "admin" ? true : false,
      message: "Logged In Successfully",
    });
  } catch (error) {
    gError(res, error);
  }
};

module.exports = { Signup, Login };
