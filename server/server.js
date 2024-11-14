// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
// Review routes
app.use('/api/reviews', reviewRoutes);

// Ensure the "uploads" directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename based on timestamp
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

// Serve static files (images) from the "uploads" folder
app.use('/uploads', express.static(uploadDir));

// Endpoint for uploading an image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
        message: 'No file uploaded',
        status: 400
      });
  }
   // Extract the base file name (without the extension)
  const baseFileName = path.basename(req.file.filename, path.extname(req.file.filename));

  // Custom response with message, status, and data (base file name without extension)
  res.json({
    message: 'File uploaded successfully',
    status: 200,
    data: baseFileName // Send only the base file name (without extension)
  });
});

// Handle errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send(err.message); // Multer-specific error
  }
  res.status(500).send('Server error'); // Generic server error
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
