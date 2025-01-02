const express = require('express');
const multer = require('multer');
const Course = require('../models/course.js');
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Add a new course
router.post('/add-course', upload.fields([{ name: 'courseImage', maxCount: 1 }, { name: 'courseVideo', maxCount: 1 }]), async (req, res) => {
  const { courseName, instructorName, description } = req.body;

  if (!req.files.courseImage || !req.files.courseVideo) {
    return res.status(400).send({ message: 'Course image and video are required' });
  }

  try {
    const newCourse = new Course({
      courseName,
      instructorName,
      courseImage: req.files.courseImage[0].path, // Save image path
      courseVideo: req.files.courseVideo[0].path, // Save video path
      description
    });

    await newCourse.save();
    res.status(201).send({ message: 'Course added successfully' });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).send({ message: 'Server error' });
  }
});
// Fetch all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
