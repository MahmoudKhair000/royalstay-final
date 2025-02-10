const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const roomSchema = mongoose.Schema({
  roomType: {
    type: String || null, // Allowed room types - Make enum in Front-end options values
    default: "Single",
  },
  price: {
    type: Number,
    default: 100,
    min: 40, // Price should not be negative
  },
  count: {
    type: Number,
    default: 100,
  },
  class: {
    type: String,
    enum: ["Economy", "Standard", "Luxury", "Premium"], // Allowed room classes
    default: "Standard", // Default to 'Standard'
  },
  description: { type: String, default: "No Description" },
  createdAt: { type: Date, default: Date.now },
  imagesurl: [],
});

const hotelSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "invalid email"],
  },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  rating: { type: Number, default: "Not assigned" },
  rooms: [roomSchema],
  imagesurl: [],
});

hotelSchema.pre("save", async function (next) {
  var salt = await bcrypt.genSalt(10);
  var hashpass = await bcrypt.hash(this.password, salt);
  this.password = hashpass;
  next();
});

module.exports = mongoose.model("hotel", hotelSchema);
