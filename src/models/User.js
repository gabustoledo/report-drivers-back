const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    salt: String,
  },
  {
    timestamps: true, // Para la fecha de creacion y modificacion
    versionKey: false, // Para quitar eso de _v
  }
);

module.exports = model("User", userSchema);
