const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ message: "Require token" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (!decoded) return res.status(403).send({ message: "Invalid token" });
    const { id } = decoded;
    User.findOne({ id })
      .exec()
      .then((user) => {
        req.user = user;
        next();
      });
  });
};

module.exports = {
  isAuthenticated,
};
