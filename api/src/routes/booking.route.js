import { Router } from "express";
import { 
    booking,
    /* avaiableTimeSLot,  */
    doctorApprovalStatus, 
    getAllBooking, 
    getBooking, 
    getDateAndTime, 
    getOnlineDateAndTime, 
    getSpecificBooking,
    updateAppointmentStatus } from "../controllers/booking.controller.js";
import { 
    systemAdminVerifyJWT,
    docApproveVerifyJwt } from "../middlewares/auth.middleware.js";
import { 
    payment, 
    paymentIntent } from "../controllers/payment.controller.js";

const router = Router()


router.route("/bookings").post(booking);

// router.route("/booked-slots/:id").get(avaiableTimeSLot);

router.route("/get-date-time").post(getDateAndTime);
router.route("/get-online-date-time").post(getOnlineDateAndTime);

router.route("/bookings").get(getAllBooking);
router.route("/bookings/:email").get(getBooking);

router.route("/booking/:id").get(getSpecificBooking);

//Approval appointment from Doctor
router.route("/booking/update/doctor/:id").put( docApproveVerifyJwt,doctorApprovalStatus);
//Approval appointment from System Admin
router.route("/booking/update/:id").put(systemAdminVerifyJWT,updateAppointmentStatus);

router.route("/booking/create-payment-intent").post(paymentIntent);
router.route("/booking/payment").post(payment);


export default router;