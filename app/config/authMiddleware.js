const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorzation?.split("")[1];
  if (!token) return res.status(401).json({ message: "Token not provided" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decode.role !== "admin")
      return res.status(403).json({ message: "Not Authorized user" });

    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
module.exports = verifyToken;
