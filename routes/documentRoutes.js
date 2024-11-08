const express = require('express');
const multer = require('multer');
const documentController = require('../controllers/documentController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// post req for doc processing
router.post('/process', upload.single('file'), documentController.processDocument);

module.exports = router;
