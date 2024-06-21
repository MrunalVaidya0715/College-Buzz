import { Router } from 'express'
import { deleteAdminQuestion, getAdminQuestions, getReportedPosts, getUsers } from '../controllers/admin.controller.js'
import { verifyToken } from "../middleware/jwt.js";
const router  = Router()

router.get('/users', getUsers)
router.get("/posts", getAdminQuestions)
router.get("/reports",getReportedPosts)
router.delete("/posts/:id", verifyToken, deleteAdminQuestion)

export default router;