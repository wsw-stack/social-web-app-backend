import express from 'express'
import Post from '../schemas/Post'
import { sendNewPost } from '../controllers/postController'

const router = express.Router()

router.post('/', sendNewPost)

export default router