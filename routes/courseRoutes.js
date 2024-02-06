const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authcontroller");

router.get("/", authController.verifyToken, courseController.getCourses);
router.post("/new", authController.isAdmin, courseController.createCourse);
router.put("/:id", authController.isAdmin, courseController.updateCourse);
router.delete("/:id", authController.isAdmin, courseController.deleteCourse);
router.get(
  "/find",
  authController.verifyToken,
  courseController.getCourseByType
);
router.post(
  "/uploadVideo",
  authController.isAdmin,
  courseController.uploadVideo
);
module.exports = router;
