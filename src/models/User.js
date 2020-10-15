const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    password: String,
    salt: String,
    role: String, // dev, admin, user
    boss: { type: Schema.Types.ObjectId, ref: "User" }, // Para los empleados, tienen asignado un boss
    active: Boolean,
  },
  {
    timestamps: false, // Para la fecha de creacion y modificacion
    versionKey: false, // Para quitar eso de _v
  }
);

module.exports = model("User", userSchema);
