import express from 'express'
import * as reviewController from '../controllers/reviewController'

const router = express.Router()

router.route('/')
    .get(reviewController.getAllReviews)
    .post(reviewController.sendNewReview)
    
router.route('/:id')
    .get(reviewController.getAReview)
    .put(reviewController.updateReview)

export default router