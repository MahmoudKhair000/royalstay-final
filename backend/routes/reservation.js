const router = require("express").Router();
// const auth = require("../middleware/auth");
const {
  getReservations,
  getReservation,
  reserve,
  change,
  cancel,
} = require("../controller/reservation");

// http://localhost:4000/reserve
router.get("/", getReservations);
router.post("/:resId", getReservation);
router.post("/:userId/:hotelId/:roomType", reserve);
router.put("/:userId/:hotelId/:roomType", change);
router.delete("/:userId/:resId", cancel);

module.exports = router;
