const express = require("express");
const {
  create,
  list,
  deleteTodo,
  update,
} = require("../controllers/toDoController");
const authenticateToken = require("../middleware/authJwt");
const router = express.Router();

router.post("/create", authenticateToken, create);
router.get("/list/:userId/:type", authenticateToken, list);
router.delete("/:id", authenticateToken, deleteTodo);
router.patch("/:id", authenticateToken, update);

module.exports = router;
