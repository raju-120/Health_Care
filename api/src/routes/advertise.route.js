import { Router } from "express";
import { advertise, getAdvertise } from "../controllers/advertise.controller.js";




const router = Router();


router.route('/advertises').post(advertise);
router.route('/advertises').get(getAdvertise);

export default router;