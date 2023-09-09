import { Router } from 'express'
import { getPosts, getUsers } from '../controllers/admin.controller.js'
const router  = Router()

router.get('/users', getUsers)
router.get('/posts', getPosts)


export default router;