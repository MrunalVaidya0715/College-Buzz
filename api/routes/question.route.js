import { Router } from "express";
import { createQuestion, getQuestions, getQuestion, deleteQuestion, getQuestionsByUserId, handleUpvote, handleDownvote, getTopQuestions, updateQuestion } from "../controllers/question.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = Router();

router.post("/", verifyToken, createQuestion)
router.get("/single/:id", getQuestion)
router.get("/", getQuestions)
router.get("/top-questions", getTopQuestions)
router.get("/:userId", getQuestionsByUserId)
router.delete("/:id", verifyToken, deleteQuestion)
router.patch("/updatePost", verifyToken, updateQuestion)
router.patch("/upvote/:id", verifyToken, handleUpvote)
router.patch("/downvote/:id", verifyToken, handleDownvote)

export default router;