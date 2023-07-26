import { Router } from "express";
import { createQuestion, getQuestions } from "../controllers/question.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = Router();

router.post("/", verifyToken, createQuestion)
router.get("/", getQuestions)
export default router;