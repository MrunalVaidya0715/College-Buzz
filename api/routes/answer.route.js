import { Router } from "express";
import { createAnswer, getAnswersByQuesId, handleDownvote, handleUpvote } from "../controllers/answer.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = Router();

router.get("/:quesId", getAnswersByQuesId)
router.post("/", verifyToken, createAnswer)
router.patch("/upvote/:id", verifyToken, handleUpvote)
router.patch("/downvote/:id", verifyToken, handleDownvote)
export default router;