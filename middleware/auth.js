const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

module.exports = verifyToken;
