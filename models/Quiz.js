const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // This should match the name you used when you created the Category model
      required: true,
    },
    questions: [
      {
        questionText: {
          type: String,
          required: true,
        },
        options: [
          {
            optionText: {
              type: String,
              required: true,
            },
            isCorrect: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        ],
        explanation: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
