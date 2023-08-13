import { Router } from "express";
import { createBadword, getBadwords, deleteBadword } from "../controllers/badword.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = Router();

router.post("/", verifyToken, createBadword)
router.get("/", getBadwords)
router.delete("/", verifyToken, deleteBadword)

export default router;