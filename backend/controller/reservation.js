const express = require("express");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { toDate } = require("validator");

// - Requiring the models
const hotelModel = require("../model/hotel");
const userModel = require("../model/user");
const reserveModel = require("../model/reservation");

// get all reservations
const getReservations = async (req, res) => {
  const reservations = await reserveModel.find();
  try {
    res.json(reservations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// get reservation by Id
const getReservation = async (req, res) => {
  const { resId } = req.params;
  try {
    const reservation = await reserveModel.findOne({ _id: resId });
    res.json(reservation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// get reservation for user
const getUserReservation = async (req, res) => {
  const { userId } = req.params;
  try {
    const reservation = await reserveModel.find({ user: userId });
    res.send(reservation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// make reservation
const reserve = async (req, res) => {
  const { userId, hotelId, roomType } = req.params;
  const user = await userModel.findOne({ _id: userId });
  const hotel = await hotelModel.findOne({ _id: hotelId });
  const room = hotel.rooms.find((x) => x.roomType == roomType);
  // find() will find one item/object, But filter() will make a new array
  // array of reservation days
  new Date();
  const resDays = [
    toDate(`2025-02-06`),
    toDate(`2025-02-07`),
    toDate(`2025-02-07`),
  ];
  try {
    let reservation = {
      user: user._id,
      userName: user.firstName + " " + user.lastName,
      userMail: user.email,
      userPhone: user.phone,
      userAge: user.age,
      hotel: hotel._id,
      hotelName: hotel.name,
      hotelMail: hotel.email,
      hotelPhone: hotel.phone,
      roomType: room.roomType,
      roomPrice: room.price,
      days: resDays,
      total: resDays.length * room.price,
    };
    await reserveModel.create(reservation);
    res.send({ message: "Done reservation!!", data: reservation });
  } catch (err) {
    res.status(404).send(err.message);
  }
};
// change reservation
const change = async (req, res) => {
  let { userId, hotelId, roomType } = req.params;
  const user = await userModel.findOne({ _id: userId });
  const hotel = await hotelModel.findOne({ _id: hotelId });

  if (req.body.roomType != null) {
    roomType = req.body.roomType;
  }
  const room = hotel.rooms.find((x) => x.roomType == roomType);
  // console.log([{ params: req.params }, { body: req.body }, { room: room }]);
  const resDays = [
    toDate(`2025-02-06`),
    toDate(`2025-02-07`),
    toDate(`2025-02-08`),
  ];
  try {
    let reservation = {
      user: user._id,
      userName: user.firstName + " " + user.lastName,
      userMail: user.email,
      userPhone: user.phone,
      userAge: user.age,

      hotel: hotel._id,
      hotelName: hotel.name,
      hotelMail: hotel.email,
      hotelPhone: hotel.phone,

      roomType: room.roomType,
      roomPrice: room.price,
      days: resDays,
      total: resDays.length * room.price,
    };
    await reserveModel.findOneAndUpdate(
      {
        user: userId,
        hotel: hotelId,
        roomType: req.params.roomType,
      },
      reservation,
      { new: true, runValidators: true }
    );
    res.send({ message: "reservation Updated !!", update: reservation });
  } catch (err) {
    res.status(404).send(err.message);
  }
};
// cancel reservation
const cancel = async (req, res) => {
  let { userId, resId } = req.params;
  try {
    await reserveModel.deleteOne({ user: userId, _id: resId });
    res.send({ message: "reservation:" + resId + " Deleted !!" });
  } catch (err) {
    res.status(404).send(err.message);
  }
};
module.exports = {
  getReservations,
  getReservation,
  getUserReservation,
  reserve,
  change,
  cancel,
};
