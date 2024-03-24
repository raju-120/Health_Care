import express from 'express';
import { doctorLists } from '../controllers/doctor.controller.js';

const router = express.Router();

router.get('/doctorlists', doctorLists);

export default router;