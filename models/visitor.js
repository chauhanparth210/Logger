const mongoose = require("mongoose");
const { Schema } = mongoose;

const hostSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  checkIn: { type: Date, default: Date.now },
  checkOut: { type: Date }
});

module.exports = mongoose.model("hosts", hostSchema);
