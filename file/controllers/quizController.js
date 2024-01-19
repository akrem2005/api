exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("category");
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve quizzes" });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz({
      title: req.body.title,
      description: req.body.description,
      category: req.body.categoryId,
      questions: req.body.questions, // Assuming questions is an array of question objects
    });
    await quiz.save();
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    quiz.title = req.body.title;
    quiz.description = req.body.description;
    quiz.category = req.body.categoryId;
    quiz.questions = req.body.questions;
    await quiz.save();
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to update quiz" });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    await quiz.remove();
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("category");
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve quiz" });
  }
};
