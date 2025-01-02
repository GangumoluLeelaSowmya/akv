const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  instructorName: { type: String, required: true },
  courseImage: { type: String, required: true }, // Store image path or URL
  description: { type: String, required: true },
  courseVideo: { type: String, required: true } // Store video path or URL
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
