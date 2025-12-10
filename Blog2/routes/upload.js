const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });
  console.log(`✅ Created uploads directory at: ${uploadDir}`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      return res.json({ message: 'File uploaded!', filePath: `uploads/${req.file.filename}` });
    }

    const { imageUrl } = req.body;
    if (imageUrl) {
      const response = await axios({ url: imageUrl, responseType: 'arraybuffer' });
  const fileName = `${Date.now()}.jpg`;
  fs.writeFileSync(path.join('uploads', fileName), response.data);
  return res.json({ message: 'Image downloaded!', filePath: `uploads/${fileName}` });
    }

    res.status(400).json({ message: 'No file uploaded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;