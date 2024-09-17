import { Router } from "express";
import { complains, getComplains } from "../controllers/complains.controller.js";

const router = Router();

router.route('/complains').post(complains);
router.route('/getcomplains').get(getComplains);

export default router;
