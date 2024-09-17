import multer from 'multer';
/* import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../utils/cloudinaryConfig'; */

const storage = multer.memoryStorage(); 

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },  // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            cb(null, true);
        } else {
            cb('Error: File type not supported. Please upload a PDF.');
        }
    }
});

export { upload };
