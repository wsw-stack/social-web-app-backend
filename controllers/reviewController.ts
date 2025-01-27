import Post from "../schemas/Post";
import Review from "../schemas/Review";

export const getAllReviews = async (req: any, res: any) => {
    try {
        const allReviews = await Review.find({})
        res.json({reviews: allReviews})
    } catch (error) {
        console.log(error)
        res.json({error: error})
    }
    

}

export const sendNewReview = async (req: any, res: any) => {
    const {postId, user, content} = req.body
    const review = new Review({
        user,
        content,
        likes: [],
        replies: []
    })
    try {
        const post: any = await Post.findById(postId)
        post.reviews.push(review)
        await review.save()
        await post.save()
        res.json({success: 'Successfully created a new review'})
    } catch(error) {
        console.log(error)
        res.json({error: error})
    }
}

export const updateReview = async (req: any, res: any) => {
    const {id} = req.params
    const {user, content, likes, replies} = req.body
    try {
        const updatedReview: any = await Review.findByIdAndUpdate(id, {
            user,
            content,
            likes,
            replies
        })
        await updatedReview.save()
        res.json({success: 'Successfully updated!'})
    } catch(err) {
        console.log(err)
        res.json({error: err})
    }
}