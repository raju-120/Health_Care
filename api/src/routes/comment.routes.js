import { Router } from "express";
import { comments, test } from "../controllers/comments.controller.js";

const router = Router();

router.route('/test').get(test);
router.route('/comments').post(comments);

export default router;