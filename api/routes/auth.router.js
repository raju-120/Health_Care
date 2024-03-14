import express from 'express';
import { doctors_signup, google, signOut, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/doctor-signup', doctors_signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signOut);

export default router;