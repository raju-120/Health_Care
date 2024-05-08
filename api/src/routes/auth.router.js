import { Router } from "express";
import { docLogoutUser, doctorSignIn, doctorSignUp, doctorUpdate, google, logoutUser, refreshAccessToken, /* refreshDocAccessToken, */ signin, signup, userUpdate } from "../controllers/auth.controller.js";
import { docUpVerifyJwt, docVerifyJwt, verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);

router.route('/doctorsignup').post(doctorSignUp);
router.route('/doctorssignin').post(doctorSignIn);

router.route('/google').post(google);



//update Doctor & user information
router.route('/update/:id').post(verifyJwt,userUpdate);
router.route('/docupdate/:id').post(docUpVerifyJwt,doctorUpdate);






//secure sections

router.route('/signout').post(verifyJwt,logoutUser);
router.route('/docsignout').post(docVerifyJwt,docLogoutUser);





router.route('/refresh-token').post(refreshAccessToken);
/* router.route('/refresh-doc-token').post(refreshDocAccessToken); */

export default router;