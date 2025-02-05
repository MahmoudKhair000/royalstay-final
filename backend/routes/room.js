const { body, validationResult } = require("express-validator");
const express = require("express");
const route = express.Router();

const {
  getHotelRooms,
  addHotelRoom,
  deleteHotelRoom,
  deleteHotelRoomById,
  updateHotelRoom,
} = require("../controller/hotel");

//http://localhost:4000/room
route.post("/:hotelId", getHotelRooms);
route.post("/:hotelId/add/", addHotelRoom);
route.delete("/:hotelId/delete/type/:roomType", deleteHotelRoom);
route.delete("/:hotelId/delete/id/:roomId", deleteHotelRoomById);
route.put("/:hotelId/update/:roomId", updateHotelRoom);

module.exports = route;
