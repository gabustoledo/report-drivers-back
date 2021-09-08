const { Schema, model } = require("mongoose");

const viaticSchema = new Schema(
  {
    amount: { type: Number, required: true },
    day: { type: Date, default: Date.now, required: true },
    id_driver: { type: Schema.Types.ObjectId, ref: "User", required: true }, // For drivers
    active: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Viatic", viaticSchema);
