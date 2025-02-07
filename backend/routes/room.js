const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

const {
  getHotelRooms,
  addHotelRoom,
  deleteHotelRoom,
  deleteHotelRoomById,
  updateHotelRoom,
} = require("../controller/hotel");

//http://localhost:4000/room
router.post("/:hotelId", getHotelRooms);
router.post("/:hotelId/add/", addHotelRoom);
router.delete("/:hotelId/delete/type/:roomType", deleteHotelRoom);
router.delete("/:hotelId/delete/id/:roomId", deleteHotelRoomById);
router.put("/:hotelId/update/:roomId", updateHotelRoom);

module.exports = router;
