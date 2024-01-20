// File: controllers/courseController.js

const Course = require("../models/Course");
const path = require("path");

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
      git: req.body.description,
      category: req.body.category,
      image: req.body.image,
      videoUrl: req.body.videoUrl,
    });
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to create course" });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    // Check if req.file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const file = req.file;
    const fileName = file.originalname;

    // Use path.resolve for better path resolution
    const filePath = path.resolve(__dirname, "videos", fileName);

    // Move the file to the specified path
    file.mv(filePath);

    // Assuming you have a Mongoose model for Course named Course
    const course = await Course.findById(req.body.courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    // Update the videoUrl property of the course
    course.videoUrl = `/videos/${fileName}`;

    // Save the updated course
    await course.save();

    res.json({
      success: true,
      message: "Video uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to upload video",
    });
    console.error("Error:", error);
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    // Update only the fields that are provided in the request
    if (req.body.title) {
      course.title = req.body.title;
    }
    if (req.body.category) {
      course.category = req.body.category;
    }
    if (req.body.description) {
      course.description = req.body.description;
    }
    if (req.body.image) {
      course.image = req.body.image;
    }
    if (req.body.videoUrl) {
      course.videoUrl = req.body.videoUrl;
    }

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Failed to update course" });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
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
