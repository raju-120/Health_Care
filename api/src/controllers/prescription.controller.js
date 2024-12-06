import { cloudinary } from '../utils/cloudinaryConfig.js';
import Prescription from '../models/prescriptions.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import streamifier from 'streamifier';


const sendPdf = async(req, res) =>{
  console.log("Body: ", req.body);
  const { htmlContent, senderId, receiverId, sendername, receivername } = req.body;

  try {
    // Create and save a new prescription
    const newPrescription = new Prescription({
      senderId,
      receiverId,
      sendername,
      receivername,
      pdfContent: htmlContent,
    });

    await newPrescription.save();
    res.status(200).json({ message: 'Prescription saved successfully' });
  } catch (error) {
    console.error('Error while saving prescription:', error);
    res.status(500).json({ error: 'Failed to save prescription' });
  }
}

const getPdf= asyncHandler(async(req, res) =>{
  const query = {};
  const result = await Prescription.find(query);
  res.status(200).json(result)
})

export {sendPdf, getPdf};
