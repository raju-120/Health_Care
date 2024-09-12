import { Router } from "express";
import { getMedicineLists, medicineList } from "../controllers/medicine.controller.js";
import { sendPdf } from "../controllers/prescription.controller.js";
import { upload } from "../middlewares/pdfMulter.middleware.js";




const router = Router();

router.route('/medicineList').post(medicineList);
router.route('/medicineLists').get(getMedicineLists);
router.route('/sendpdf').post(upload.single('file'), sendPdf);

export default router;