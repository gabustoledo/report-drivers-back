const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authCtrl = {};

// Funcion para generar un token de un dia con un id.
const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: 86400,
  });
};

// Funcion para registrar un usuario, generando una salt y una pass encriptada
authCtrl.register = (req, res) => {
  const { name, email, password } = req.body;
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString("base64");
    crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", (err, key) => {
      const encryptedPassword = key.toString("base64");
      User.findOne({ email })
        .exec()
        .then((user) => {
          if (user) {
            return res.send("Usuario ya existe");
          }
          User.create({
            name,
            email,
            password: encryptedPassword,
            salt: newSalt,
          }).then(() => {
            res.send({ message: "Usuario creado con exito" });
          });
        });
    });
  });
};

// Funcion para comprobar los datos ingresados del usuario y generar un token en caso de estar registrado.
authCtrl.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.send("Usuario y/o contraseña incorrecta");
      }
      crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (user.password === encryptedPassword) {
          const token = signToken(user._id);
          return res.send({ token });
        }
        return res.send({ message: "Usuario y/o contraseña incorrecta" });
      });
    });
};

module.exports = authCtrl;
