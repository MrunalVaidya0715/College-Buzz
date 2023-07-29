import { Router } from "express";
import { createAnswer, getAnswersByQuesId } from "../controllers/answer.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = Router();

router.get("/:quesId", getAnswersByQuesId)
router.post("/", verifyToken, createAnswer)

export default router;