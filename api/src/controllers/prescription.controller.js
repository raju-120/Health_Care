import { cloudinary } from '../utils/cloudinaryConfig.js';
import Prescription from '../models/prescriptions.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import streamifier from 'streamifier';




const sendPdf = asyncHandler(async (req, res) => {
    try {
        //console.log("File ", req.file)
        const { senderId, receiverId, senderusername, receiverusername } = req.body;

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Upload the PDF directly from buffer
        const uploadFromBuffer = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { 
                      resource_type: 'raw', 
                      folder: 'pdf_uploads',
                      public_id: `${Date.now()}.pdf`
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // Upload buffer to Cloudinary
        const result = await uploadFromBuffer(req.file.buffer);

        // Create a new message with the uploaded file's details
        const newMessage = new Prescription({
            senderId,
            senderusername,
            receiverId,
            receiverusername,
            pdf: {
                url: result.secure_url,         // Cloudinary URL
                public_id: result.public_id,    // Cloudinary public ID
                contentType: req.file.mimetype, // MIME type
            }
        });
        console.log("PDF", newMessage)
        await newMessage.save();

        res.status(200).json({
            message: 'Message and PDF file uploaded successfully',
            newMessage,
        });

    } catch (err) {
        res.status(500).json({
            message: 'Error uploading the PDF',
            error: err.message,
        });
    }
});


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