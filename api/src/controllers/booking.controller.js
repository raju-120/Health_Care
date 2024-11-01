import {Appointment} from "../models/appointment.model.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import nodemailer from 'nodemailer';
import Mailgen from "mailgen";
import { Doctor } from "../models/doctor.model.js";



const booking = asyncHandler(async (req, res) => {
  const {
    name, dateOfBirth, gender, phone, department,
    doctor, date, price, permission, uId, email, docId,
    appointmentSlots, meeting, onlineAppointmentSlots
  } = req.body;

  try {
    // Check if doctor exists
    const doctorData = await Doctor.findById(docId);
    if (!doctorData) {
      return res.status(404).json(new APIResponse(404, null, "Doctor not found."));
    }

    // Check if user already has an appointment on the same date
    const existingAppointment = await Appointment.findOne({ email, date });
    if (existingAppointment) {
      const message = `You already have an appointment on ${date} at ${existingAppointment.appointmentSlots}.`;
      return res.status(400).json({ acknowledge: false, message });
    }

    // Create a new appointment if no conflicts
    const newAppointment = new Appointment({
      name, dateOfBirth, gender, phone, department,
      doctor, date, price, permission, uId, email,
      docId, appointmentSlots, meeting, onlineAppointmentSlots
    });
    await newAppointment.save();

    return res.status(201).json(new APIResponse(201, newAppointment, "Doctor appointment submitted successfully."));
    
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json(new APIResponse(500, null, "Internal server error."));
  }
});


//Get Booking based on the user email ID 
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
    const { status, docapporve, friend, doctor, date, department, email, doctorEmail, name } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    if (req.user.role !== 'system-admin' && req.user.role !== 'admin' && req.user.role !== 'doctor') {
        throw new ApiError(403, "Forbidden: You don't have permission to update this appointment");
    }

    try {
        const appointment = await Appointment.findByIdAndUpdate(id, { status, docapporve, friend }, { new: true });
        console.log("Approval of Data: ", appointment);

        if (!appointment) {
            console.log("Appointment not found for id:", id);
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (req.user.role === 'system-admin') {
            // Generate a Google Meet link (placeholder logic)
            const googleMeetLink = `https://meet.google.com/${Math.random().toString(36).substring(2, 8)}`;

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
                    username: `${name}`,
                    intro: 'Your Appointment has been Approved.',
                    table: {
                        data: [
                            {
                                description: `Your appointment with ${doctor} in the ${department} department on Date: ${date} has been approved. Please arrive at least 20 minutes before your scheduled time.`,
                                
                            }
                        ]
                    },
                    outro: 'Thank you for your co-operation.'
                }
            };

            let mailContent = MailGenerator.generate(response);

            // Helper function to validate emails
            const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

            // Prepare user email
            let userMessage = isValidEmail(email) ? {
                from: process.env.EMAIL_NODEMAILER,
                to: email,
                subject: "Approval of Your Appointment with Doctor",
                html: mailContent
            } : null;

            // Prepare doctor email
            let doctorMessage = isValidEmail(doctorEmail) ? {
                from: process.env.EMAIL_NODEMAILER,
                to: doctorEmail,
                subject: "New Appointment Approved",
                html: mailContent
            } : null;

            // Send emails sequentially if they are valid
            const sendUserEmail = userMessage ? transporter.sendMail(userMessage) : Promise.resolve();
            const sendDoctorEmail = doctorMessage ? transporter.sendMail(doctorMessage) : Promise.resolve();

            // Send emails to both user and doctor
            sendUserEmail
                .then(() => sendDoctorEmail)
                .then(() => {
                    console.log('Emails sent successfully');
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



const avaiableTimeSLot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  
  console.log("Date from server ID: ", id);
  
  // Query for doctor or appointment
  // const query = { doctor: id };
  const query = await Doctor.findById(id);
  // console.log("Doc Details: ", query);

  // const findDocId = {docId === query}

  // Find available dates and appointments for the doctor
const avaiableDates = await Appointment.find({docId: query});
  console.log("Doc Details: ", avaiableDates);

  // Get the already booked appointments for the specific date
  // const appointmentQuery = { date, doctor: id };
  // const alreadyBooked = await Appointment.find(appointmentQuery);

  // Check and filter available slots
  // avaiableDates.forEach(option => {
  //   const dateOptionBooked = alreadyBooked.filter(book => book.doctor === option.doctor);
  //   const bookedSlots = dateOptionBooked.map(book => book.slot);
  //   const remainingSlots = option.slots.filter(slot => !bookedSlots.includes(slot));
  //   option.slots = remainingSlots;
  // });

  // res.send(avaiableDates);
});

const getDateAndTime = asyncHandler(async(req, res) =>{
  const {docId,date} = req.body;  
  // console.log("Date Server: ", date);
    try {
        const appointments = await Appointment.find({ 
            docId: docId,
            date: date  // Match the specific date
        });
        // console.log("Server: ", appointments)
        const availableSlots = ["06:00 PM - 06:30 PM", "06:30 PM - 07:00 PM", "07:00 PM - 07:30 PM", "07:30 PM - 08:00 PM"]

        const bookedSlots = appointments.map(appointment => appointment.appointmentSlots);
        // console.log(bookedSlots)

        // Filter available slots by excluding the booked ones
        const freeSlots = availableSlots.filter(slot => !bookedSlots.includes(slot));
        // console.log(freeSlots)

        return res.status(200).json({ freeSlots });


        return slots;
    } catch (error) {
        console.error("Error fetching appointments: ", error);
        throw error;
    }
});

const getOnlineDateAndTime = asyncHandler(async(req, res) =>{
  const {docId,date} = req.body;  
  // console.log("Date Server: ", date);
    try {
        const appointments = await Appointment.find({ 
            docId: docId,
            date: date  // Match the specific date
        });
        // console.log("Server: ", appointments)
        const availableSlots = ["08:10 PM - 08:40 PM", "08:50 PM - 09:20 PM", "09:30 PM - 10:00 PM"]

        const bookedSlots = appointments.map(appointment => appointment.onlineAppointmentSlots);
        // console.log(bookedSlots)

        // Filter available slots by excluding the booked ones
        const freeSlots = availableSlots.filter(slot => !bookedSlots.includes(slot));
        // console.log(freeSlots)

        return res.status(200).json({ freeSlots });

    } catch (error) {
        console.error("Error fetching appointments: ", error);
        throw error;
    }
})







export {
    booking,
    /* getBookedSlots, */
    getBooking,
    getSpecificBooking,
    getAllBooking,
    updateAppointmentStatus,
    avaiableTimeSLot,
    getDateAndTime,
    getOnlineDateAndTime
};

