import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to store files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save file with original name
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Accept only PDFs
  } else {
    cb(new Error('Only PDF Files are allowed'), false); // Reject other files
  }
};

const upload = multer({
  storage,
  fileFilter
});

export { upload };
