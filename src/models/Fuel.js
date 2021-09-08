const { Schema, model } = require("mongoose");

const fuelSchema = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now, required: true },
    mileage: { type: Number, required: true },
    liters: { type: Number, required: true },
    photo: { type: String, required: true },
    id_driver: { type: Schema.Types.ObjectId, ref: "User", required: true }, // For drivers
    active: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Fuel", fuelSchema);
