import { Router } from "express";
import { dropPost, getAllServices, getAllSolution, getPost, getSpecificService, getSpecificSolution } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
/* import { createPrescription } from "../controllers/prescription.controller.js"; */


const router = Router();

router.route("/droped").post( upload.fields([
    {
        name: "avatar",
        maxCount: 10
    }
]),dropPost);

router.route("/all-posts").get(getPost);
router.route("/services").get(getAllServices);
router.route("/service/:id").get(getSpecificService);

router.route("/solutions").get(getAllSolution);
router.route("/solution/:id").get(getSpecificSolution);

/* router.route('/prescription').post(createPrescription); */



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