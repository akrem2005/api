const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authcontroller");

router.get("/", authController.verifyToken, courseController.getCourses);
router.post("/new", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
router.get(
  "/find",
  authController.verifyToken,
  courseController.getCourseByType
);
router.post("/uploadVideo", courseController.uploadVideo);
module.exports = router;
