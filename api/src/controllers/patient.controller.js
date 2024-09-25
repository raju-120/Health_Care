
import { Patient } from "../models/patient.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const patientRegistration = asyncHandler(async(req, res) =>{
    try {
        const patientData = req.body;
        const newPatient = new Patient (patientData);

        // Save the patient to the database
        await newPatient.save();

        res.status(201).json({
            message: 'Patient registered successfully',
            patient: newPatient
        });
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({
            message: 'Failed to register patient',
            error: error.message
        });
    }
})

export {
    patientRegistration
}

