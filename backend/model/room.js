const mongoose = require("mongoose");

// Define the Room Schema
const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  hotel:{/*reference to hotel*/},
  type: {
    type: String,
    enum: ["Single", "Double", "Suite"], // Allowed room types
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Price should not be negative
  },
  status: {
    type: String,
    enum: ["Available", "Booked", "Maintenance"], // Room status
    default: "Available",
  },
  location: {
    building: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
  },
  class: {
    type: String,
    enum: ["Economy", "Standard", "Luxury", "Premium"], // Allowed room classes
    required: true,
    default: "Standard", // Default to 'Standard'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  schedule: [{ start: { type: Date }, end: { type: Date } }],
  imagesurl: [],
});

// Create the Room model
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
