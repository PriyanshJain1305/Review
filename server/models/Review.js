const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  file_id: {
    type: String, // Stores the file name which is also the file_id
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  studentsWatched: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you are using a User model to store user info
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
