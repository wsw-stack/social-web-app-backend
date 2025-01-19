import express from 'express'
import Post from '../schemas/Post'
import { sendNewPost, getAllPosts } from '../controllers/postController'

const router = express.Router()

router.route('/')
    .post(sendNewPost)
    .get(getAllPosts)

export default router