import { Router } from "express";
import { logoutUser, signin, signup } from "../controllers/auth.controller.js";


const router = Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/signout').post(logoutUser);

export default router;