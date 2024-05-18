import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
/* import protectRoute from "../middlewares/protected.middle.js"; */
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { docVerifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyJwt, getMessages);
router.get("/doc/:id", docVerifyJwt, getMessages);

router.post("/send/:id", verifyJwt,sendMessage);
router.post("/send/doc/:id", docVerifyJwt,sendMessage);

export default router;