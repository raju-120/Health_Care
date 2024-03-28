import express  from "express";
import { dropPost, test } from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middleware.js";
/* import upload from "../middleware/upload.js"; */

/* import multer from "multer";

 const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        return cb(null, 'uploads/')
    },
    filename: function(req, file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer ({storage}); 
 */
const router = express.Router();



router.get('/test', test);
router.post('/droppost', upload.single('avatar'),dropPost);

export default router;