import {Appointment} from "../models/appointment.model.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
/* import mongoose from "mongoose";
import sendGridMail from "@sendgrid/mail"; */

const booking = asyncHandler(async (req, res) => {
    try {
        const {
            name, dateOfBirth, gender, phone,
            department, doctor, date, appointmentSlots,
            price, permission,uId,email
        } = req.body;

        const newAppointment = new Appointment({
            name, dateOfBirth, gender, phone,
            department, doctor, date, appointmentSlots,
            price, permission,uId,email
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

  const getSpecificBooking = asyncHandler(async( req, res) =>{
    const {id} = req.params;

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
    const { status } = req.body;
  
    console.log("Updating appointment with id:", id);
    console.log("New status:", status); // Check status here
  
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
  
    if (req.user.role !== 'system-admin' && req.user.role !== 'admin') {
      throw new ApiError(403, "Forbidden: You don't have permission to update this appointment");
    }
  
    try {
      const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!appointment) {
        console.log("Appointment not found for id:", id);
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      console.log("Appointment updated successfully:", appointment);
      res.status(200).json(appointment);
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

