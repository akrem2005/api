const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authcontroller");
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
