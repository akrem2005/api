// File: controllers/courseController.js

const Course = require("../models/Course");
const path = require("path");
const multer = require("multer");

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
const upload = multer({ storage: storage });

// Handle HTML file upload
exports.uploadFile = (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // You can save the file details to the database or perform other operations here

  res.send("File uploaded successfully!");
};

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
      description: req.body.description,
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
exports.getCourseByType = async (req, res) => {
  try {
    const courses = await Course.find({ category: req.query.category });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: "Courses not found" });
    }

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve Courses" });
  }
};
