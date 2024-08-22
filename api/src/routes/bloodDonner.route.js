import { Router } from "express";
import { bloodDonerlists, bloodDonnerRegister } from "../controllers/blood.controller.js";

const router = Router();

router.route('/blooddonner').post(bloodDonnerRegister);
router.route('/blooddonnerlist').get(bloodDonerlists);

export default router;