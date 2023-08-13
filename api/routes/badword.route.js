import { Router } from "express";
import { createBadword, getBadwords, deleteBadword, getBadwordsByUserId } from "../controllers/badword.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = Router();

router.post("/", verifyToken, createBadword)
router.get("/", getBadwords)
router.get("/:userId",verifyToken, getBadwordsByUserId)
router.delete("/:wordId",verifyToken, deleteBadword)

export default router;