const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  })
);
dotenv.config();
// .connect("mongodb://localhost:27017/hotelapp")
mongoose
.connect("mongodb+srv://Group1:Pass4Group1@cluster0.3u0tj.mongodb.net/hotelapp")
  .then(() => {
    console.log("connected to db successefully");
  })
  .catch((err) => {
    console.log(err);
  });

const userRoutes = require("./routes/user");
const hotelRoutes = require("./routes/hotel");
const roomRoutes = require("./routes/room");
const reservationRoutes = require("./routes/reservation");

app.use("/user", userRoutes);
app.use("/hotel", hotelRoutes);
app.use("/room", roomRoutes);
app.use("/reservation", reservationRoutes);

app.listen(4000, () => console.log("connected to port 4000"));
