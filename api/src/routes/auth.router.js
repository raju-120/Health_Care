import { Router } from "express";
import { docLogoutUser,
    generateDocAccessAndRefreshTokens, 
    doctorSignIn,
    doctorSignUp,
    doctorUpdate, 
    getAllDoctors,
    getAllUsers,
    getSpecificDoctor,
    google,
    logoutUser,
    refreshAccessToken,
    signin,
    signup,
    /* refreshDocAccessToken, */ 
    userUpdate } from "../controllers/auth.controller.js";

import { AdminVerifyJWT, docUpVerifyJwt, docVerifyJwt, systemAdminVerifyJWT, verifyJwt } from "../middlewares/auth.middleware.js";
import { adminDelete, adminLogOut, adminSignIn,adminSignup, getAllAdminList, systemAdminOut, systemAdminSignIn, systemAdminSignup } from "../controllers/adminAuth.controller.js";
import {adminUpload} from "../middlewares/adminmulter.middleware.js";

const router = Router();

//System Admin Signup & sing in
router.route('/systemadminsignup').post(systemAdminSignup);
router.route('/systemadminsignin').post(systemAdminSignIn);
router.route('/sysadminlogout').post(systemAdminVerifyJWT, systemAdminOut);


// Admin Signup & sign in section
router.route('/adminsignup').post(adminUpload,adminSignup )
router.route('/adminsignin').post(adminSignIn);
router.route('/adminlogout').post(AdminVerifyJWT,adminLogOut);

router.route('/getadmin').get(getAllAdminList);
router.route('/admin-delete/:id').delete(systemAdminVerifyJWT,adminDelete);

//User sign in & sign up

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/users').get(getAllUsers);

//Doctors sections

router.route('/doctorsignup').post(doctorSignUp);
router.route('/doctorssignin').post(doctorSignIn);
router.route('/doctors').get(getAllDoctors);
router.route('/doctors/:id').get(getSpecificDoctor);

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