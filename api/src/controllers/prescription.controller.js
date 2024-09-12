import Message from '../models/message.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const sendPdf = asyncHandler(async(req, res) =>{
  
  try{
    console.log("backend: ", req.body)
    const { senderId, receiverId, senderusername, receiverusername } = req.body;
    
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Create a new message with the uploaded file's details
    const newMessage = new Message({
      senderId,
      senderusername,
      receiverId,
      receiverusername,
      
      pdfFile: {
        path: req.file.path,           
        contentType: req.file.mimetype 
      }
    });
    console.log("Final Data: ", newMessage)
    
    // Save the message and file metadata to the database
    await newMessage.save();

    // Respond with success and the stored message data
    res.status(200).json({
      message: 'Message and PDF file uploaded successfully',
      newMessage
    });
  }catch(err){
    res.status(500).json({
      message: 'Error uploading the PDF',
      error: err.message
    });
  } 
});

export {sendPdf};






























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