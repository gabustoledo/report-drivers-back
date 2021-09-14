const { Schema, model } = require("mongoose");

const moneySchema = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now, required: true },
    detail: { type: String, required: true },
		type: { type: String, required: true }, // Ingreso o egreso
    id_driver: { type: Schema.Types.ObjectId, ref: "User", required: true }, // For drivers
    active: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Money", moneySchema);