import { Patient } from "../models/patient.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const patientRegistration = asyncHandler(async (req, res) => {
  try {
    const patientData = req.body;

    console.log("Reg Body: ", req.body);

    const existingPatient = await Patient.findOne({
      $or: [
        { email: patientData.email },
        { nationalId: patientData.nationalId },
      ],
    });

    if (existingPatient) {
      return res.status(400).json({
        message: "A patient with this email or national ID already exists",
      });
    }

    // Create a new patient instance
    const newPatient = new Patient(patientData);

    // Save the patient to the database
    await newPatient.save();

    res.status(201).json({
      message: "Patient registered successfully",
      patient: newPatient,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({
      message: "Failed to register patient",
      error: error.message,
    });
  }
});
// Get all patients
const getAllPatients = asyncHandler(async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({
      message: "Failed to fetch patients",
      error: error.message,
    });
  }
});

const getPatientById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid patient ID format" });
    }

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({
      message: "Failed to fetch patient",
      error: error.message,
    });
  }
});

const getPatientRegisterdInformation = asyncHandler(async (res, req) => {
  const { uId } = req.params;
  console.log("UID INformation: ", uId);
  try {
    const patient = await Patient.findOne({ _id: uId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient data: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export {
  patientRegistration,
  getAllPatients,
  getPatientById,
  getPatientRegisterdInformation,
};
