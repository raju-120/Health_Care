import { Router } from "express";
import { getAllPaytmentLists, specificPaymentID } from "../controllers/payment.controller.js";

const router = Router();

router.route("/paymentlists").get(getAllPaytmentLists);
router.route("/paymentid/:id").get(specificPaymentID);

export default router;