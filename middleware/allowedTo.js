const AppError = require("../utils/AppError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        AppError.create(`this role is not authorized ->${req.user.role}`, 401)
      );
    }
    next(); // نسيتها في كودك الحالي!
  };
};
