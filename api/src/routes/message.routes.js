import express from "express";
import { getMessages, sendMessage, sendPdf } from "../controllers/message.controller.js";
import { docVerifyJwtForMessage, verifyJwt } from "../middlewares/auth.middleware.js";



const router = express.Router();

router.post("/",  getMessages);
router.post("/doc/:id", docVerifyJwtForMessage, getMessages);

router.post("/send/doc/:id", docVerifyJwtForMessage,sendMessage);





export default router;