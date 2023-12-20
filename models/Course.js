const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  videoUrl: String,
});
module.exports = mongoose.model("Course", courseSchema);
