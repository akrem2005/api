const express = require("express");
const router = express.Router();
const questionController = require("../controllers/quizController");

// Create a question
router.post("/questions", questionController.createQuestion);

// Get all questions
router.get("/questions", questionController.getQuestions);

// Get a specific question by ID
router.get("/questions/:id", questionController.getQuestionById);

// Update a question by ID
router.put("/questions/:id", questionController.updateQuestion);

// Delete a question by ID
router.delete("/questions/:id", questionController.deleteQuestion);

module.exports = router;
