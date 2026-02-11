const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    // authMiddleware should have been called first
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied. This action requires ${requiredRole} role.`,
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
