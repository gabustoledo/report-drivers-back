const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authCtrl = {};

// Funcion para generar un token de un dia con un id.
const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: 2678400, // Un mes dura el token
  });
};

// Funcion para registrar un usuario, generando una salt y una pass encriptada
authCtrl.register = (req, res) => {
  const { name, password } = req.body;
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString("base64");
    crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", (err, key) => {
      const encryptedPassword = key.toString("base64");
      User.findOne({ name })
        .exec()
        .then((user) => {
          if (user) {
            return res.send({ message: "User already exists" });
          }
          User.create({
            name,
            password: encryptedPassword,
            salt: newSalt,
            role: req.user.role === "dev" ? "admin" : "driver",
            employer: req.user._id,
            active: true,
          }).then(() => {
            res.send({ message: "User created successfully" });
          });
        });
    });
  });
};

// Funcion para comprobar los datos ingresados del usuario y generar un token en caso de estar registrado.
authCtrl.login = (req, res) => {
  const { name, password } = req.body;
  User.findOne({ name })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Incorrect username and/or password" });
      }
      if (!user.active) {
        return res.status(500).send({
          message: "User inactive, contact with your employer",
        });
      }
      crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (user.password === encryptedPassword) {
          const token = signToken(user._id);
          return res.status(200).send({ token });
        }
        return res.status(404).send({ message: "Incorrect username and/or password" });
      });
    });
};

authCtrl.me = (req, res) => {
  return res.send({
    _id: req.user._id,
    name: req.user.name,
    role: req.user.role,
  });
};

module.exports = authCtrl;
