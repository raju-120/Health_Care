import { Router } from "express";
import { getAllPatients, getPatientById, patientRegistration } from "../controllers/patient.controller.js";

const router = Router()


router.route('/patient-reg-form').post(patientRegistration);
router.route('/patient-reg-form').get(getAllPatients);
router.route('/patient-reg-form/:id').get(getPatientById);

export default router;