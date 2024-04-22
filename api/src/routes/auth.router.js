import { Router } from "express";
import { doctorSignIn, doctorSignUp, google, logoutUser, refreshAccessToken, /* refreshDocAccessToken, */ signin, signup } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);

router.route('/doctorsignup').post(doctorSignUp);
router.route('/doctorssignin').post(doctorSignIn);

router.route('/google').post(google);

//secure sections
router.route('/signout').post(verifyJwt,logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
/* router.route('/refresh-doc-token').post(refreshDocAccessToken); */

export default router;