import { Router } from "express";
import { signIn } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", signIn)

export default router;