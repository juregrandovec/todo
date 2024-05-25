const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("../server/routes/authRoutes");
const toDoRoutes = require("../server/routes/toDoRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/todo", toDoRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
