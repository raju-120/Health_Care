import express from 'express';
import { listDesignatons } from '../controllers/designation.controller.js';


const router = express.Router();

router.get('/lists', listDesignatons);

export default router;