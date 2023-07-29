import { Router } from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = Router();

router.get("/delete/:userId", verifyToken, deleteUser)
router.get("/:userId", getUser)

export default router;