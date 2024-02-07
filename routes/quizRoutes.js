const express = require("express");
const router = express.Router();
const questionController = require("../controllers/quizController");
const authController = require("../controllers/authcontroller");
//Use Router
// Create a question
router.post(
  "/questions",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  questionController.createQuestion
);

// Get all questions
router.get(
  "/questions",
  authController.verifyToken,
  questionController.getQuestions
);

// Get a specific question by ID
router.get(
  "/questions/:id",
  authController.verifyToken,
  questionController.getQuestionById
);

// Update a question by ID
router.put(
  "/questions/:id",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  questionController.updateQuestion
);

// Delete a question by ID
router.delete(
  "/questions/:id",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  questionController.deleteQuestion
);

module.exports = router;
