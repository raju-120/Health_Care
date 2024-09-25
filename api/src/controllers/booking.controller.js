import {Appointment} from "../models/appointment.model.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import nodemailer from 'nodemailer';
import Mailgen from "mailgen";
/* import mongoose from "mongoose";
import sendGridMail from "@sendgrid/mail"; */

const booking = asyncHandler(async (req, res) => {
    try {
      const {
        name, dateOfBirth, gender, phone,
        department, doctor, date, 
        price, permission, uId, email, docId, appointmentSlot, appointmentType, advPrice
      } = req.body;
  
      // Fetch the doctor from the database
      const doctorData = await Doctor.findById(docId);
  
      if (!doctorData) {
        return res.status(404).json(new APIResponse(404, null, "Doctor not found."));
      }
  
      // Select slots based on appointment type (online or in-person)
      const availableSlots = appointmentType === 'online' ? doctorData.onlineSlots : doctorData.slots;
  
      // Check if the selected slot is part of the available slots
      if (!availableSlots.includes(appointmentSlot)) {
        return res.status(400).json(new APIResponse(400, null, "Invalid time slot selected."));
      }
  
      // Check if the slot is already booked for the doctor on the selected date
      const existingAppointment = await Appointment.findOne({
        docId,
        date,
        appointmentSlot,
      });
  
      if (existingAppointment) {
        return res.status(400).json(new APIResponse(400, null, "This time slot is already booked."));
      }
  
      // If the slot is available, proceed with booking
      const newAppointment = new Appointment({
        name, dateOfBirth, gender, phone,
        department, doctor, date, 
        price, permission, uId, email, docId, appointmentSlot, appointmentType, advPrice
      });
  
      await newAppointment.save();
  
      return res.status(201).json(
        new APIResponse(200, newAppointment, "Doctor appointment submitted successfully.")
      );
    } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json(
        new APIResponse(500, null, "Failed to submit doctor appointment.")
      );
    }
  });
  

const getBooking = asyncHandler(async (req, res) => {
    try {
      const email = req.params.email;
  
      if (!isValidEmail(email)) {
        return res.status(400).json(new APIResponse(400, null, "Invalid email."));
      }
  
      const bookings = await Appointment.find({ email: email });
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json(new APIResponse(404, null, "No bookings found for this email."));
      }
  
      res.status(200).json(new APIResponse(200, bookings, "Bookings retrieved successfully."));
    } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json(new APIResponse(500, null, "Failed to retrieve bookings."));
    }
  });
  
  
  function isValidEmail(email) {
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const getAllBooking = asyncHandler(async(req, res) =>{
    const query =  {};
    const result = await Appointment.find(query);
    res.status(201).json(
      new APIResponse(201, result, "All the Appointment list founded.")
  )
  })

  const getSpecificBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("backend: ", id);
  
    if (!id) {
      throw new ApiError(400, 'Appointment Id is required');
    }
    const booking = await Appointment.findById(id);
    res.status(200).json({
      success: true,
      message: 'Specific id found successfully',
      data: booking,
    });
  });
  

  const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, docapporve, friend, doctor, date, department, email,name } = req.body;

    //console.log("Updating appointment with id:", id);
    //console.log("New status:", status);

    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    if (req.user.role !== 'system-admin' && req.user.role !== 'admin' && req.user.role !== 'doctor') {
        throw new ApiError(403, "Forbidden: You don't have permission to update this appointment");
    }

    try {
        const appointment = await Appointment.findByIdAndUpdate(id, { status, docapporve, friend }, { new: true });

        if (!appointment) {
            console.log("Appointment not found for id:", id);
            return res.status(404).json({ message: 'Appointment not found' });
        }

        //console.log("Appointment updated successfully:", appointment);

        if(req.user.role === 'system-admin'){
            let config = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_NODEMAILER,
                    pass: process.env.PASS_NODEMAILER
                }
            };
    
            let transporter = nodemailer.createTransport(config);
    
            let MailGenerator = new Mailgen({
                theme: 'default',
                product: {
                    name: 'EvenCare',
                    link: 'https://mailgen.js/',
                }
            });
    
            let response = {
                body: {
                    name: name,
                    intro: 'Your Appointment has been Approved.',
                    table: {
                        data: [
                            {
                                /* item: 'Nodemailer Stack Book', */
                                description: `Your appointment with ${doctor} in this ${department} department Date:${date} has been approved. Please arrive at least 20 minutes before your scheduled time.`
                            }
                        ]
                    },
                    outro: 'Thank you for your cooperation.'
                }
            };
    
            let mail = MailGenerator.generate(response);
            let message = {
                from: process.env.EMAIL_NODEMAILER,
                to: email,
                subject: "Approval of Your Appointment with Doctor",
                html: mail
            };
    
            transporter.sendMail(message)
                .then(() => {
                    console.log('Email sent successfully');
                    res.status(200).json({
                        msg: 'Appointment updated and email confirmation sent.',
                        appointment
                    });
                })
                .catch(error => {
                    console.error("Error sending email:", error);
                    res.status(500).json({
                        msg: 'Appointment updated but failed to send email confirmation.',
                        appointment,
                        error
                    });
                });
        }

    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





export {
    booking,
    getBooking,
    getSpecificBooking,
    getAllBooking,
    updateAppointmentStatus
};

