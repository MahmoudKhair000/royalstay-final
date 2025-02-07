const router = require("express").Router();
const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth");

const {
  getHotels,
  createHotel,
  getHotelById,
  loginHotel,
  deleteHotel,
  updateHotel,
} = require("../controller/hotel");

//http://localhost:4000/hotel
router.get("/", getHotels);
router.get("/:hotelId", getHotelById);
router.post("/register", createHotel);
router.post("/login", loginHotel);
router.put("/update/:hotelId", updateHotel);
router.delete("/delete/:hotelId", deleteHotel);

router.patch("/test", async (req, res) => {
  try {
    const comTest = await bcrypt.compare(
      "01551533884",
      "$2a$10$Ty7i.7NVKk.8T1F3IsMkSuWC2JeJfA.q7xp11usr8LELuHI76wYyK"
    );
    res.json({isValid:comTest})
  } catch (err) {
    res.status(402).send({ message: err.message });
  }
});

module.exports = router;
