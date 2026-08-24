// This middleware must ALWAYS run AFTER authMiddleware.
// authMiddleware verifies the JWT and sets req.user = decoded token payload.
// This middleware just checks req.user.role.

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }

  next();
};

module.exports = adminMiddleware;
