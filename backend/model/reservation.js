const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");

let reserveSchema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId },
  userName: { type: String, required: true },
  userMail: { type: String, required: true },
  userPhone: { type: String, required: true },
  userAge: { type: String, required: true },
  // mongoose populate
  hotel: { type: mongoose.Types.ObjectId },
  hotelName: { type: String, required: true },
  hotelMail: { type: String, required: true },
  hotelPhone: { type: String, required: true },
  // room type and price
  roomType: { type: String, required: true },
  roomClass: { type: String },
  roomPrice: { type: Number, required: true },
  days: [],
  total: { type: Int32 },
  notes: { type: String },
});

module.exports = mongoose.model("reservation", reserveSchema);
