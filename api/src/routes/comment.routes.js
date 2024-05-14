import { Router } from "express";
import { comments, getcomments, test } from "../controllers/comments.controller.js";

const router = Router();

router.route('/test').get(test);
router.route('/comments').post(comments);
router.route('/comments').get(getcomments);

export default router;