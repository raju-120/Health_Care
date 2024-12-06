import { Router } from "express";
import { getMedicineLists, medicineList } from "../controllers/medicine.controller.js";
import { getPdf, sendPdf } from "../controllers/prescription.controller.js";


const router = Router();

router.route('/medicineList').post(medicineList);
router.route('/medicineLists').get(getMedicineLists);

router.route('/getpdf').get(getPdf);

export default router;