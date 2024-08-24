import { Router } from "express";
import { getMedicineLists, medicineList } from "../controllers/medicine.controller.js";

const router = Router();

router.route('/medicineList').post(medicineList);
router.route('/medicineLists').get(getMedicineLists);

export default router;