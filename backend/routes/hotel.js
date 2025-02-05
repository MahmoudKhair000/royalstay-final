const route = require("express").Router();
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
route.get("/", getHotels);
route.get("/:hotelId", getHotelById);
route.post("/register", createHotel);
route.post("/login", loginHotel);
route.put("/update/:hotelId", updateHotel);
route.delete("/delete/:hotelId", deleteHotel);

route.patch("/test", async (req, res) => {
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

module.exports = route;
