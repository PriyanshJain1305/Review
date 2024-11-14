const express = require('express');
const multer = require('multer');
const path = require('path');
const Review = require('../models/Review');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Set up multer storage for the review image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Store with a unique name based on timestamp
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Create a review
router.post('/', protect, upload.single('image'), async (req, res) => {
  const { stars, title, studentsWatched } = req.body;

  if (!req.file || !stars || !title || !studentsWatched) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const review = new Review({
      file_id: req.file.filename, // Store the file name as the 'file_id' field
      stars,
      title,
      studentsWatched,
      createdBy: req.user._id
    });

    await review.save();
    res.status(201).json({ message: 'Review created successfully', status: 201, data: review });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a review
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  const { stars, title, studentsWatched } = req.body;

  try {
    const review = await Review.findById(req.params.id);

    if (!review || review.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Review not found or not authorized' });
    }

    review.stars = stars || review.stars;
    review.title = title || review.title;
    review.studentsWatched = studentsWatched || review.studentsWatched;
    
    // If a new file is uploaded, update 'image' and 'file_id'
    if (req.file) {
      review.image = req.file.filename;
      review.file_id = req.file.filename;
    }

    await review.save();
    res.status(200).json({ message: 'Review updated successfully', status: 200, data: review });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Delete a review
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      console.log("Review not found");
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if the logged-in user is authorized to delete this review
    if (review.createdBy.toString() !== req.user._id.toString()) {
      console.log("User not authorized to delete this review");
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Review deleted successfully', status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('createdBy', 'name');
    res.status(200).json({ message: 'Reviews fetched successfully', status: 200, data: reviews });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get the file by its file_id (same as file_name)
router.get('/file/:file_id', async (req, res) => {
  const { file_id } = req.params;

  // Construct the file path using the file_id
  const filePath = path.join(__dirname, '../uploads', file_id);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);  // Send the file as the response
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

module.exports = router;
