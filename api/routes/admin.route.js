import { Router } from 'express'
import { deleteAdminQuestion, getAdminQuestions, getUsers } from '../controllers/admin.controller.js'
import { verifyToken } from "../middleware/jwt.js";
const router  = Router()

router.get('/users', getUsers)
router.get("/posts", getAdminQuestions)
router.delete("/posts/:id", verifyToken, deleteAdminQuestion)



export default router;