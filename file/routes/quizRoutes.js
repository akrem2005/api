const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
router.get("/quizzes", quizController.getQuizzes);
router.post("/quizzes", quizController.createQuiz);
router.put("/quizzes/:id", quizController.updateQuiz);
router.delete("/quizzes/:id", quizController.deleteQuiz);
router.get("/quizzes/:id", quizController.getQuizById);

module.exports = router;
