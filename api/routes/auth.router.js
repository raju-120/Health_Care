import express from 'express';
import { doctorSignIn, doctorssignup, google, signOut, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.post('/doctorsignup', doctorssignup);
router.post('/doctorssignin', doctorSignIn);
router.get('/signout', signOut);

export default router;

