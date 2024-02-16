const Question = require("../models/Question"); // Assuming you have a Question model

exports.createQuestion = async (req, res) => {
  try {
    // Destructuring request body directly in the function parameters
    const { questionText, options, correctAnswer, catagory } = req.body;

    // Creating a new Question instance with object shorthand
    const question = new Question({
      questionText,
      options,
      correctAnswer,
      catagory,
    });

    // Using async/await to save the question
    const savedQuestion = await question.save();

    // Sending the saved question as the response
    res.json(savedQuestion);
  } catch (error) {
    console.error(error);

    // Sending a more informative error response
    res
      .status(500)
      .json({ error: "Failed to create question", details: error.message });
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
    const question = await Question.findByIdAndDelete(req.params.id);

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
