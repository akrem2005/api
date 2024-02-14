const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const categoryRoutes = require("./routes/categoryRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const paymentRoutes = require("./routes/paymentsRoutes");
const notificationsRoutes = require("./routes/notificationRoutes");

const cors = require("cors");
const fs = require("fs");

mongoose
  .connect(
    "mongodb+srv://aradax:aradaxadmin@aradax.ijasfaq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

const app = express();
app.use(express.json());
app.use(cors());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/categories", categoryRoutes);
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/pay", paymentRoutes);
app.use("/notifications", notificationsRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/delete", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "submitform.html"));
});
app.get("/privacypolicy", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "privacypolicy.html"));
});
app.get("/overview", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "overview.html"));
});
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use((req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use((req, res, next) => {
  res.status(403).sendFile(path.join(__dirname, "views", "404.html"));
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
