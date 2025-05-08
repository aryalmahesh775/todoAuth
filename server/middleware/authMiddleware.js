const jwt = require("jsonwebtoken");
const { responde } = require("../utils/responseHandler");

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;
  try {
    if (!token) {
      return responde(res, 401, "Access denied .No token available.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return responde(res, 401, "Invalid token");
  }
};

module.exports = authMiddleware; 