const { Schema, model } = require("mongoose");

const extraSchema = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now, required: true },
    comment: { type: String, required: true },
    photo: { type: String, required: true },
    id_driver: { type: Schema.Types.ObjectId, ref: "User", required: true }, // For drivers
    active: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Extra", extraSchema);
