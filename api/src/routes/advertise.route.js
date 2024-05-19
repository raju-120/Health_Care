import { Router } from "express";
import { advertise } from "../controllers/advertise.controller.js";




const router = Router();


router.route('/advertises').post(advertise);

export default router;