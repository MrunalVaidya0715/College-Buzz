import { Router } from 'express'
import { deleteAdminQuestion, getAdminQuestions, getPosts, getUsers } from '../controllers/admin.controller.js'
import { verifyToken } from "../middleware/jwt.js";
const router  = Router()

router.get('/users', getUsers)
router.get('/posts', getPosts)
router.get("/", getAdminQuestions)
router.delete("/:id", verifyToken, deleteAdminQuestion)



export default router;