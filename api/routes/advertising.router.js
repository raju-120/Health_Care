import express  from "express";
import {  createAdvertise, tested } from "../controllers/advertise.controller.js";

const router = express.Router();

router.get('/tested', tested);
router.post('/create-advertise',createAdvertise);

export default router;