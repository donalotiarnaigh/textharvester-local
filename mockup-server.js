const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configuration for Multer (File Uploading)
const upload = multer({
    dest: '/Users/danieltierney/Desktop/Dev/AI:ML/openai-playground/HG_TextHarvest_v2/uploads/', // This is the folder where files will be saved
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file); // Log the entire file object for inspection

  if (req.file) {
      console.log('Received file:', req.file.originalname);
      // Process the file here (send to OpenAI API, etc.)

      // Send a response to the client
      res.send('File uploaded successfully.');
  } else {
      console.error('No file uploaded');
      res.status(400).send('No file uploaded.');
  }
});


// Home route (can be removed if all UI is served from 'public')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mockup.html'));
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});