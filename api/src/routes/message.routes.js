import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { docVerifyJwtForMessage, verifyJwt } from "../middlewares/auth.middleware.js";
//import { createPrescription } from "../controllers/prescription.controller.js";
/* import protectRoute from "../middlewares/protected.middle.js"; */
//import { docVerifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",  getMessages);
router.post("/doc/:id", docVerifyJwtForMessage, getMessages);

router.post("/send/:id", verifyJwt,sendMessage);
router.post("/send/doc/:id", docVerifyJwtForMessage,sendMessage);


export default router;