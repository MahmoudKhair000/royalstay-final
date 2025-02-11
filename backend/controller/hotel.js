const express = require("express");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// this is the "hotel & room" Model
const hotelModel = require("../model/hotel");

// hotel rooms functions
const getHotels = async (req, res) => {
  // let token = req.headers.authorization;
  const hotels = await hotelModel.find();
  try {
    res.json(hotels);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const getHotelById = async (req, res) => {
  const { hotelId } = req.params;
  const hotel = await hotelModel.findOne({ _id: hotelId });
  try {
    res.json(hotel);
  } catch (err) {
    res.status(404).send(err.message);
  }
};
const createHotel = async (req, res) => {
  let newhotel = req.body;
  let savehotel = await hotelModel.create(newhotel);
  try {
    res.json({ message: "done new hotel", date: savehotel });
  } catch (err) {
    res.status(400).json(err);
  }
};
const loginHotel = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ maeesage: "you must enter email and password" });
  }

  const hotel = await hotelModel.findOne({ email: email });
  if (!hotel) {
    res.status(404).json({ meassage: "invalid email" });
  } else {
    try {
      const isvalid = await bcryptjs.compare(password, hotel.password);
      if (isvalid) {
        var token = jwt.sign(
          { id: hotel._id, email: hotel.email },
          process.env.SECRET
        );
        localStorage.setItem("token", token);
        console.log("password match: " + isvalid);
        console.log(token);
        res.status(200).json({ message: "Successful login", token: token });
      } else {
        console.log("password match: " + isvalid);
        res.status(401).json({ message: "invalid password" });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  }
};
const deleteHotel = async (req, res) => {
  // params is taken from link : http://localhost:4000/hotel/?id=675181c6dec21b197effd608
  const { hotelId } = req.params;
  try {
    await hotelModel.findOneAndDelete({ _id: hotelId });
    res.send("Hotel Deleted Successfully!!");
  } catch (err) {
    res.status(404).send(err.message);
  }
};
const updateHotel = async (req, res) => {
  // params is taken from link : http://localhost:4000/hotel/?id=675181c6dec21b197effd608
  const { hotelId } = req.params;
  const update = req.body;
  try {
    await hotelModel.findByIdAndUpdate(hotelId, update, {
      new: true, // Return the room after it's updated
      runValidators: true, // Validate the data during the update
    });
    res.send("Hotel Updated Successfully!!");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

// hotel rooms functions
const getRoomById = async (req, res) => {
  try {
    const { hotelId, roomId } = req.body;
    const hotel = await hotelModel.findOne({ _id: hotelId });
    const hotelRooms = await hotel.rooms;
    const room = await hotelRooms.find((x) => x._id == roomId);
    res.json(room);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const getHotelRooms = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const hotel = await hotelModel.findOne({ _id: hotelId });
    const hotelRooms = await hotel.rooms;
    res.json(hotelRooms);
  } catch (err) {
    res.status(404).send(err.message);
  }
};
const addHotelRoom = async (req, res) => {
  try {
    const { hotelId } = await req.params;
    const hotel = await hotelModel.findOne({ _id: hotelId });
    let hotelRooms = hotel.rooms; // Array
    await hotelRooms.push(req.body); //pushing
    const update = { rooms: hotelRooms };
    await hotelModel.findByIdAndUpdate(hotelId, update, {
      new: true,
      runValidators: true,
    });
    res.send(hotelRooms);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const deleteHotelRoom = async (req, res) => {
  const { hotelId } = await req.params;
  const hotel = await hotelModel.findOne({ _id: hotelId });
  let hotelRooms = hotel.rooms; // Array

  const { roomType } = await req.params;
  const updated = hotelRooms.filter(
    (x) => x.roomType != roomType && x.roomType != null
  );
  const update = { rooms: updated };
  try {
    // update with a new array
    await hotelModel.findByIdAndUpdate(hotelId, update, {
      runValidators: true,
    });
    const hotelAfter = await hotelModel.findOne({ _id: hotelId });
    res.send({
      message: "deleted successfully !!!",
      // params: req.params,
      // hotelAfter: hotelAfter,
      roomsAfter: hotelAfter.rooms,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const deleteHotelRoomById = async (req, res) => {
  const { hotelId } = await req.params;
  const hotel = await hotelModel.findOne({ _id: hotelId });
  let hotelRooms = hotel.rooms; // Array

  const { roomId } = await req.params;
  const updated = hotelRooms.filter((x) => x._id != roomId && x._id != null);
  const update = { rooms: updated };
  try {
    // update with a new array
    await hotelModel.findByIdAndUpdate(hotelId, update, {
      runValidators: true,
    });
    const hotelAfter = await hotelModel.findOne({ _id: hotelId });
    const roomsAfter = await hotelAfter.rooms;
    res.send({
      params: req.params,
      message: "deleted successfully !!!",
      // roomsFiltered: updated,
      roomsAfter: roomsAfter,
      // hotelAfter: hotelAfter,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const updateHotelRoom = async (req, res) => {
  const { hotelId } = await req.params;
  const { roomId } = await req.params;
  const hotel = await hotelModel.findOne({ _id: hotelId }); // document
  let hotelRooms = hotel.rooms; // Array
  const target = hotelRooms.find((x) => x._id == roomId);
  const update = req.body;
  for (let x in target) {
    if (update[x] != null) {
      target[x] = update[x];
    }
  }
  try {
    await hotelModel.findByIdAndUpdate(
      hotelId,
      { rooms: hotelRooms },
      { new: true, runValidators: true }
    );
    res.json({
      room: hotelRooms.find((x) => x._id == roomId),
      roomsAfter: hotelRooms,
    });
  } catch (err) {
    res.status(406).send(err.message);
  }
};
module.exports = {
  // Hotel Functions
  getHotels,
  createHotel,
  getHotelById,
  loginHotel,
  deleteHotel,
  updateHotel,
  // Room Functions
  getRoomById,
  getHotelRooms,
  addHotelRoom,
  deleteHotelRoom,
  deleteHotelRoomById,
  updateHotelRoom,
};
