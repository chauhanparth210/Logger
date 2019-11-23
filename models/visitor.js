const mongoose = require("mongoose");
const { Schema } = mongoose;

const hostSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  checkIn: { type: Date, default: Date.now },
  isCheckout: { type: Boolean, default: false },
  checkOut: { type: Date }
});

module.exports = mongoose.model("visitors", hostSchema);
