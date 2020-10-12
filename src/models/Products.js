const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
  },
  {
    timestamps: true, // Para la fecha de creacion y modificacion
    versionKey: false, // Para quitar eso de _v
  }
);

module.exports = model("Product", productSchema);