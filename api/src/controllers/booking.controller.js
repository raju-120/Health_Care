import { Appointment } from "../models/appointment.model.js";
import { APIResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { Doctor } from "../models/doctor.model.js";

//Booking Appopintment
const booking = asyncHandler(async (req, res) => {
  const {
    name,
    dateOfBirth,
    gender,
    phone,
    department,
    doctor,
    date,
    price,
    permission,
    uId,
    email,
    docId,
    appointmentSlots,
    meeting,
    onlineAppointmentSlots,
  } = req.body;

  try {
    // Check if doctor exists
    const doctorData = await Doctor.findById(docId);
    if (!doctorData) {
      return res
        .status(404)
        .json(new APIResponse(404, null, "Doctor not found."));
    }

    // Check if user already has an appointment on the same date
    const existingAppointment = await Appointment.findOne({ email, date });
    if (existingAppointment) {
      const message = `You already have an appointment on ${date} at ${existingAppointment.appointmentSlots}.`;
      return res.status(400).json({ acknowledge: false, message });
    }

    // Create a new appointment if no conflicts
    const newAppointment = new Appointment({
      name,
      dateOfBirth,
      gender,
      phone,
      department,
      doctor,
      date,
      price,
      permission,
      uId,
      email,
      docId,
      appointmentSlots,
      meeting,
      onlineAppointmentSlots,
    });
    await newAppointment.save();

    return res
      .status(201)
      .json(
        new APIResponse(
          201,
          newAppointment,
          "Doctor appointment submitted successfully.",
        ),
      );
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json(new APIResponse(500, null, "Internal server error."));
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
      return res
        .status(404)
        .json(new APIResponse(404, null, "No bookings found for this email."));
    }

    res
      .status(200)
      .json(new APIResponse(200, bookings, "Bookings retrieved successfully."));
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json(new APIResponse(500, null, "Failed to retrieve bookings."));
  }
});

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const getAllBooking = asyncHandler(async (req, res) => {
  const query = {};
  const result = await Appointment.find(query);
  res
    .status(201)
    .json(new APIResponse(201, result, "All the Appointment list founded."));
});

// Specific Id Based appointment find
const getSpecificBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("backend: ", id);

  if (!id) {
    throw new ApiError(400, "Appointment Id is required");
  }
  const booking = await Appointment.findById(id);
  res.status(200).json({
    success: true,
    message: "Specific id found successfully",
    data: booking,
  });
});

// Approval from Admin end
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    status,
    doctor,
    date,
    department,
    email,
    doctorEmail,
    name,
    isVerified,
  } = req.body;

  // console.log("Approval ID: ", id);
  // console.log("Approval Request Body: ", req.body);

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  if (req.user.role !== "system-admin" && req.user.role !== "admin") {
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to update this appointment",
    );
  }

  try {
    // Update appointment in the database
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      {
        status,
        doctor,
        date,
        department,
        email,
        doctorEmail,
        name,
        isVerified,
      },
      { new: true }, // Return the updated document
    );

    if (!appointment) {
      console.log("Appointment not found for id:", id);
      return res.status(404).json({ message: "Appointment Id is not found" });
    }

    // Email sending logic for 'system-admin' role
    if (req.user.role === "system-admin") {
      let config = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_NODEMAILER,
          pass: process.env.PASS_NODEMAILER,
        },
      };

      let transporter = nodemailer.createTransport(config);

      let MailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "EvenCare",
          link: "https://mailgen.js/",
        },
      });

      // Generate email content
      let response = {
        body: {
          username: `${name}` || "User", // Fallback to 'User' if name is undefined
          intro: "Your Appointment has been Approved.",
          table: {
            data: [
              {
                description: `Your appointment with ${
                  doctor || "the doctor"
                } in the ${department || "the department"} on Date: ${
                  date || "the specified date"
                } has been approved. Please arrive at least 20 minutes before your scheduled time.`,
              },
            ],
          },
          outro: "Thank you for your co-operation.",
        },
      };

      let mailContent = MailGenerator.generate(response);

      // Helper function to validate emails
      const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

      // Prepare user email
      let userMessage = isValidEmail(email)
        ? {
            from: process.env.EMAIL_NODEMAILER,
            to: email,
            subject: "Approval of Your Appointment with Doctor",
            html: mailContent,
          }
        : null;

      // Prepare doctor email
      let doctorMessage = isValidEmail(doctorEmail)
        ? {
            from: process.env.EMAIL_NODEMAILER,
            to: doctorEmail,
            subject: "New Appointment Approved",
            html: mailContent,
          }
        : null;

      // Send emails to both user and doctor
      try {
        if (userMessage) await transporter.sendMail(userMessage);
        if (doctorMessage) await transporter.sendMail(doctorMessage);

        console.log("Emails sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
        // Log email failure but do not send an extra response
      }
    }

    // Send a single response after email sending
    res.status(200).json({
      success: true,
      message: "Appointment updated and email confirmation sent.",
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Approval from Admin end
const doctorApprovalStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, docapporve, friend } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }
  if (req.user.role !== "doctor") {
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to update this appointment ID",
    );
  }

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status, docapporve, friend },
      { new: true },
    );
    console.log("Approval of Data: ", appointment);
    res.status(200).json({
      success: true,
      message: "Appointment from Doctor is confirmed",
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Face-To-Face available time
const getDateAndTime = asyncHandler(async (req, res) => {
  const { docId, date } = req.body;

  try {
    const appointments = await Appointment.find({
      docId: docId,
      date: date,
    });

    const availableSlots = [
      "06:00 PM - 06:30 PM",
      "06:30 PM - 07:00 PM",
      "07:00 PM - 07:30 PM",
      "07:30 PM - 08:00 PM",
    ];
    console.log("Slots available: ", availableSlots);
    const bookedSlots = appointments.map(
      (appointment) => appointment.appointmentSlots,
    );
    console.log("Slots available: ", bookedSlots);

    const freeSlots = availableSlots.filter(
      (slot) => !bookedSlots.includes(slot),
    );
    // console.log("Free Slots: ", freeSlots);
    return res.status(200).json({ freeSlots });

    // return slots;
  } catch (error) {
    console.error("Error fetching appointments: ", error);
    throw error;
  }
});

// Get Online available time
const getOnlineDateAndTime = asyncHandler(async (req, res) => {
  const { docId, date } = req.body;
  try {
    const appointments = await Appointment.find({
      docId: docId,
      date: date,
    });
    // console.log("Server: ", appointments)
    const availableSlots = [
      "08:10 PM - 08:40 PM",
      "08:50 PM - 09:20 PM",
      "09:30 PM - 10:00 PM",
    ];

    const bookedSlots = appointments.map(
      (appointment) => appointment.onlineAppointmentSlots,
    );

    // Filter available slots by excluding the booked ones
    const freeSlots = availableSlots.filter(
      (slot) => !bookedSlots.includes(slot),
    );
    console.log("Free Slots: ", freeSlots);

    return res.status(200).json({ freeSlots });
  } catch (error) {
    console.error("Error fetching appointments: ", error);
    throw error;
  }
});

export {
  booking,
  /* getBookedSlots, */
  getBooking,
  getSpecificBooking,
  getAllBooking,
  updateAppointmentStatus,
  // avaiableTimeSLot,
  getDateAndTime,
  getOnlineDateAndTime,
  doctorApprovalStatus,
};
