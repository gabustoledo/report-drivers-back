const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ message: "Require token" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (!decoded) return res.status(403).send({ message: "Invalid token" });
    const { _id } = decoded;
    User.findOne({ _id })
      .exec()
      .then((user) => {
        req.user = user;
        next();
      });
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "dev") {
    return next();
  }
  return res.status(403).send({ message: "Invalid role" });
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
