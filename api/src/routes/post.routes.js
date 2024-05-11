import { Router } from "express";
import { dropPost, getPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/droped").post( upload.fields([
    {
        name: "avatar",
        maxCount: 10
    }
]),dropPost);

router.route("/all-posts").get(getPost);


export default router;











/* import express from "express";
import {  dropPost, dropTest} from "../controllers/post.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = express.Router();

router.get("/test", dropTest);
router.post("/droped",upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]), dropPost);

export default router; */