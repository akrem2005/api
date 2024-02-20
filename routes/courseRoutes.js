const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }); // Initialize Multer

//Use Router
router.get("/", authController.verifyToken, courseController.getCourses);
router.post(
  "/new",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  courseController.createCourse
);
router.put(
  "/:id",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  courseController.updateCourse
);
router.delete(
  "/:id",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  courseController.deleteCourse
);
router.get(
  "/find",
  authController.verifyToken,
  courseController.getCourseByType
);
router.post(
  "/upload",
  upload.single("htmlFile"),
  authController.verifyTokenAndAdmin,
  authController.verifyToken,
  courseController.uploadFile
);
module.exports = router;
