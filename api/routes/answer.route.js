import { Router } from "express";
import { createAnswer } from "../controllers/answer.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = Router();

router.post("/", verifyToken, createAnswer)

export default router;