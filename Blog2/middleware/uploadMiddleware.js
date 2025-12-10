const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure uploads folder exists
// Create uploads directory in project root
const projectRoot = path.resolve(__dirname, '..');
const uploadDir = path.join(projectRoot, 'uploads');

// Ensure uploads directory exists with proper permissions
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });
  console.log(`✅ Created uploads directory at: ${uploadDir}`);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
module.exports = upload;