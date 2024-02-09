const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const categoryRoutes = require("./routes/categoryRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const paymentRoutes = require("./routes/paymentsRoutes");
const notificationsRoutes = require("./routes/notificationRoutes");
const fs = require("fs");

mongoose
  .connect(
    "mongodb+srv://aradax:aradaxadmin@aradax.ijasfaq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

const app = express();
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/download", (req, res) => {
  const filePath = path.join(
    __dirname,
    "apk",
    "com.companyname.aradax-Signed.apk"
  ); // Path to your local file

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Set the Content-Disposition header to trigger a download
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=com.companyname.aradax-Signed.apk"
    );

    // Stream the file as the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).send("File not found");
  }
});

app.use("/categories", categoryRoutes);
app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/pay", paymentRoutes);
app.use("/notifications", notificationsRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
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
