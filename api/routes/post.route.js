import express  from "express";
import { dropPost, test } from "../controllers/post.controller.js";

const router = express.Router();

router.get('/test', test);
router.post('/droppost', dropPost);

export default router;