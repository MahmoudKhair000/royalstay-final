const express = require("express");
const router = express.Router();
const { getAllUsers,getUserById, register, login } = require("../controller/user");

router.get("/", getAllUsers);
router.post("/id", getUserById);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
