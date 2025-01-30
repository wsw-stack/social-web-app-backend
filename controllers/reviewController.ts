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

export const getAReview = async (req: any, res: any) => {
    const {id} = req.params
    try {
        const review = await Review.findById(id)
        await review?.populate('user', 'username')
        await review?.populate({
            path: 'replies',
            populate: {
              path: 'user',
              select: 'username',
            },
        })  
        res.json({review: review})
    } catch (error) {
        console.log(error)
        res.json({error: error})
    }
}

export const sendNewReview = async (req: any, res: any) => {
    const {postId, user, content} = req.body
    const review = new Review({
        user,
        post: postId,
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
    const { ...updateFields } = req.body
    try {
        const updatedReview: any = await Review.findByIdAndUpdate(id, updateFields, { new: true })
        await updatedReview.save()
        res.json({success: 'Successfully updated!'})
    } catch(err) {
        console.log(err)
        res.json({error: err})
    }
}

export const replyToAReview = async (req: any, res: any) => {
    const {id} = req.params
    const {user, content} = req.body
    try {
        const review = await Review.findById(id)
        const newReply: any = new Review({
            user,
            post: review?.post,
            content,
            likes: [],
            replies: []
        })
        review?.replies.push(newReply)
        await newReply.save()
        await review?.save()
        res.json({success: 'Successfully posted a reply!'})
    } catch(err) {
        console.log(err)
        res.json({error: err})
    }
}

export const getReplyCount = async (req: any, res: any) => {
    const {id} = req.params
    try {
        const replyCount = await getAllReplies(id)
        res.json({replyCount: replyCount})
    } catch(err) {
        console.log(err)
        res.json({error: err})
    }
}

const getAllReplies = async (id: number) => {
    const review: any = await Review.findById(id);
    const directReplies = review.replies
    let count = directReplies.length;

    for (const reply of directReplies) {
        count += await getAllReplies(reply._id);
    }

    return count;
}
