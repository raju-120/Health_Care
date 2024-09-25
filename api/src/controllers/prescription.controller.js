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






























/* import fs from 'fs';
import path, { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';
import { Prescription } from '../models/prescriptions.model.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatePdf = (prescriptionData) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, `../uploads/pdfs/prescription_${Date.now()}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(25).text('Prescription', { align: 'center' });

  prescriptionData.forEach((med, index) => {
    doc.fontSize(14).text(`${index + 1}. Medicine: ${med.name}, Dosage: ${med.dosage}`);
  });

  doc.end();

  return filePath;
};

const createPrescription = async (req, res) => {
  const { senderId, receiverId, medicines } = req.body;

  try {
    const filePath = generatePdf(medicines);

    const newPrescription = new Prescription({
      senderId,
      receiverId,
      medicines,
      pdfUrl: filePath,
    });

    await newPrescription.save();

    res.status(201).json(newPrescription);
  } catch (error) {
    console.error('Error in createPrescription controller:', error.message);
    console.error(error);  
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { createPrescription };
 */