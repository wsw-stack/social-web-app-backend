import express from 'express'
import Post from '../schemas/Post'
import * as postController from '../controllers/postController'

const router = express.Router()

router.route('/')
    .post(postController.sendNewPost)
    .get(postController.getAllPosts)

router.route('/:id').get(postController.getPost)
    .put(postController.updatePost)

export default router