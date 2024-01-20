const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", courseController.getCourses);
router.post("/new", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
router.get("/:category", courseController.getCourseByType);
router.post("/uploadVideo", courseController.uploadVideo);
module.exports = router;
