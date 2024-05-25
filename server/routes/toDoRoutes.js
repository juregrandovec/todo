const express = require("express");
const { createToDo } = require("../controllers/toDoController");
const authenticateToken = require("../middleware/authJwt");
const router = express.Router();

router.post("/create", authenticateToken, createToDo);

module.exports = router;
