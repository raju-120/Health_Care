import express from "express";
import { getMessages, sendMessage} from "../controllers/message.controller.js";
import { docVerifyJwtForMessage } from "../middlewares/auth.middleware.js";



const router = express.Router();

router.post("/",  getMessages);
router.post("/doc/:id", docVerifyJwtForMessage, getMessages);

router.post("/send/doc/:id", docVerifyJwtForMessage,sendMessage);


export default router;