import { Router } from "express";
import { avaiableTimeSLot, booking, getAllBooking, /* getBookedSlots, */ getBooking, getDateAndTime, getSpecificBooking, updateAppointmentStatus } from "../controllers/booking.controller.js";
import {  /* verifyJwtApproval, */systemAdminVerifyJWT,docApproveVerifyJwt } from "../middlewares/auth.middleware.js";
import { payment, paymentIntent } from "../controllers/payment.controller.js";

const router = Router()


router.route("/bookings").post(booking);

router.route("/booked-slots/:id").get(avaiableTimeSLot);

router.route("/get-date-time").post(getDateAndTime);

router.route("/bookings").get(getAllBooking);
router.route("/bookings/:email").get(getBooking);
// router.route("/booking/:id").get(getSpecificBooking);

router.route("/booking/:id").get(getSpecificBooking);
router.route("/advbooking/:id").get(getSpecificBooking);


router.route("/booking/update/doctor/:id").put( docApproveVerifyJwt/* ,systemAdminVerifyJWT, */,updateAppointmentStatus);
router.route("/booking/update/:id").put( /* docApproveVerifyJwt, */systemAdminVerifyJWT,updateAppointmentStatus);

router.route("/booking/create-payment-intent").post(paymentIntent);
router.route("/booking/payment").post(payment);





export default router;