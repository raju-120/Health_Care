import { Router } from "express";
import { booking, getAllBooking, getBooking, getSpecificBooking, updateAppointmentStatus } from "../controllers/booking.controller.js";
import { AdminVerifyJWT, systemAdminVerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.route("/bookings").get(getAllBooking);
router.route("/bookings").post(booking);
router.route("/bookings/:email").get(getBooking);
router.route("/booking/:id").get(getSpecificBooking);

router.route("/booking/update/:id").put(systemAdminVerifyJWT, updateAppointmentStatus);




export default router;