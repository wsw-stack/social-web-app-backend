import express from 'express'
import * as postController from '../controllers/postController'

const router = express.Router()

router.route('/')
    .post(postController.sendNewPost)
    .get(postController.getAllPosts)

router.route('/:id').get(postController.getPost)
    .put(postController.updatePost)

router.route('/:id/reviewCount').get(postController.getReviewCount)

export default router