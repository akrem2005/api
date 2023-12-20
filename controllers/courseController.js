// File: controllers/courseController.js

const Course = require("../models/Course");

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("category");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve courses" });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = new Course({
      title: req.body.title,
      category: req.body.categoryId,
    });
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to create course" });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    const file = req.file;
    const fileName = file.originalname;
    const filePath = path.join(__dirname, "videos", fileName);
    file.mv(filePath);
    const course = await Course.findById(req.body.courseId);
    course.videoUrl = `http://localhost:3000/videos/${fileName}`;
    await course.save();
    res.json({
      success: true,
      message: "Video uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to upload video",
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    course.title = req.body.title;
    course.category = req.body.categoryId;
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to update course" });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await course.remove();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete course" });
  }
};
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve course" });
  }
};
