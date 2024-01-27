const { Question } = require("../models/Quiz"); // Update with the correct model path

exports.createQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswer } = req.body;

    const question = new Question({
      questionText: questionText,
      options: options,
      correctAnswer: correctAnswer,
    });

    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create question" });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve questions" });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve question" });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswer } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    question.questionText = questionText;
    question.options = options;
    question.correctAnswer = correctAnswer;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update question" });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    await question.remove();
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete question" });
  }
};
