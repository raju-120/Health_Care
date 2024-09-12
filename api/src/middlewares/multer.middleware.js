import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {cloudinary }from '../utils/cloudinaryConfig.js';

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb( null,"./uploads");
    },
    
    filename: function(req, file, cb) {
        cb(null, file.originalname )
        console.log(file);
    }
});

const storagePdf = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'prescriptions',
        format: async () => 'pdf',
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

export const uploadPdf = multer({
    storage: storagePdf,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
}).single('pdf');

export const upload = multer({storage,storagePdf ,/* uploadPdf */});

