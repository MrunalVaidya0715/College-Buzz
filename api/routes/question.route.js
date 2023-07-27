import { Router } from "express";
import { createQuestion, getQuestions, getQuestion, deleteQuestion } from "../controllers/question.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = Router();

router.post("/", verifyToken, createQuestion)
router.get("/single/:id", getQuestion)
router.get("/", getQuestions)
router.delete("/:id", verifyToken, deleteQuestion)
export default router;