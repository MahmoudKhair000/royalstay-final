const router = require("express").Router();
// const auth = require("../middleware/auth");
const {
  getReservations,
  getRoomReservations,
  getReservation,
  getUserReservation,
  reserve,
  change,
  cancel,
} = require("../controller/reservation");

// http://localhost:4000/reservation
router.get("/", getReservations);
router.get("/room/:roomId", getRoomReservations);
router.get("/id/:resId", getReservation);
router.get("/user/:userId", getUserReservation);
router.post("/add", reserve);
router.put("/:userId/:hotelId/:roomType", change);
router.delete("/:userId/:resId", cancel);

module.exports = router;
