const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    password: String,
    salt: String,
    role: String, // dev, admin, driver
    //employer: { type: Schema.Types.ObjectId, ref: "User" }, // For drivers
    active: Boolean,
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
