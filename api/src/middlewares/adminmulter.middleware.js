import multer from "multer";
import path from "path";

// Local storage configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Validate file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Error: Images Only!"));
  }
}

export const adminUpload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1 MB size limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("avatar");
