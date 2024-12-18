import { Router } from "express";
import {
  getAllPatients,
  getPatientById,
  getPatientRegisterdInformation,
  patientRegistration,
} from "../controllers/patient.controller.js";

const router = Router();

router.route("/patient-reg-form").post(patientRegistration);
router.route("/patient-reg-form").get(getAllPatients);
router.route("/patient-reg-form/:id").get(getPatientById);
router
  .route("/patient-reg-form/user-id/:uid")
  .get(getPatientRegisterdInformation);

export default router;
