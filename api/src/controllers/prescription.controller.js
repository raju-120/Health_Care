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