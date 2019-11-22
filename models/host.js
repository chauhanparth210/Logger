const mongoose = require("mongoose");
const { Schema } = mongoose;

const hostSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  visitor: [
    {
      type: Schema.Types.ObjectId,
      ref: "visitors"
    }
  ]
});

module.exports = mongoose.model("hosts", hostSchema);
