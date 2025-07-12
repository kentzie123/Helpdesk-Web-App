const jwt = require("jsonwebtoken");

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    const token =
      req.cookies.access || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Access denied: insufficient role" });
      }

      next(); // Go to the controller
    } catch (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
};

module.exports = { requireRole };
