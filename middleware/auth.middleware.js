const jwt = require("jsonwebtoken");

/* =========================
   Authentication
========================= */
exports.verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No auth header");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded);
    req.user = decoded; // { userId, iat, exp }
    next();
  } catch (err) {
    console.log("Token invalid");
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/* =========================
    Authorization
========================= */
exports.requireRole = (role) => {
  return (req, res, next) => {  
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: Insufficient rights" });
    }   
    next();
  };
};