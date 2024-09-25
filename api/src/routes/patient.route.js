import { Router } from "express";
import { patientRegistration } from "../controllers/patient.controller.js";

const router = Router()


router.route('/patient-reg-form').post(patientRegistration);

export default router;