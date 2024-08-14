import { Router } from "express";
import { getAllPaytmentLists } from "../controllers/payment.controller.js";

const router = Router();

router.route("/paymentlists").get(getAllPaytmentLists);

export default router;