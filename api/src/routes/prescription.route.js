import { Router } from "express";
import { getPdf, sendPdf } from "../controllers/prescription.controller.js";

const router = Router();


router.route('/sendpdf').post(sendPdf)
router.route('/getpdf').get(getPdf)

export default router;