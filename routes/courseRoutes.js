const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authcontroller");
//Use Router
router.get("/", authController.verifyToken, courseController.getCourses);
router.post("/new", authController.verifyToken, courseController.createCourse);
router.put("/:id", authController.verifyToken, courseController.updateCourse);
router.delete(
  "/:id",
  authController.verifyToken,
  courseController.deleteCourse
);
router.get(
  "/find",
  authController.verifyToken,
  courseController.getCourseByType
);
router.post(
  "/uploadVideo",
  authController.verifyToken,
  courseController.uploadVideo
);
module.exports = router;
