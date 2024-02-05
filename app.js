// File: app.js

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const categoryRoutes = require("./routes/categoryRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const paymentRoutes = require("./routes/paymentsRoutes");

mongoose
  .connect(
    "mongodb+srv://aradax:aradaxadmin@aradax.ijasfaq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

const app = express();
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/pay", paymentRoutes);
app.get("/get", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
