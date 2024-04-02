import { Router } from "express";
import { logoutUser, refreshAccessToken, signin, signup } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);

//secure sections
router.route('/signout').post(verifyJwt,logoutUser);
router.route('/refresh-token').post(refreshAccessToken)

export default router;