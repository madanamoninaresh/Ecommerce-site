const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await userModel.findOne({ email: decoded.email }).select("-password");

    req.user = user;      // attach user globally
    res.locals.user = user; // optional: for showing name in UI

    next();

  } catch (err) {
    req.user = null;
    next();
  }
};
