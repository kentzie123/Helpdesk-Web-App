const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access; // 🔐 Get cookie named "access"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // ✅ Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Attach the decoded user info to the request
    req.user = decoded;

    // ✅ Allow the request to proceed
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
