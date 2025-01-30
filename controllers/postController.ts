import mongoose from "mongoose"
import Post from "../schemas/Post"
import Review from "../schemas/Review"

export const sendNewPost = async (req: any, res: any) => {
    const {user, content} = req.body
    try{
        const newPost: any = new Post({
            user,
            content
        })
        await newPost.save()
        res.json({success: 'Successfully made a new post'})
    }
    catch(err) {
        console.log(err)
        res.json({error: err})
    }
}

export const getAllPosts = async (req: any, res: any) => {
    try {
        const allPosts: any = await Post.find({})
        const allPopulatedPosts = []
        for(const post of allPosts) {
            await post.populate('user', 'username')
            await post.populate({
                path: 'reviews',
                populate: { path: 'user', select: 'username' },
            });
            allPopulatedPosts.push(post)
        }
        res.json({posts: allPopulatedPosts})
    }
    catch(error) {
        console.log(error)
        res.json({error: error})
    }
}

export const getPost = async (req: any, res: any) => {
    const {id} = req.params
    try {
        const post = await Post.findById(id).populate('user', 'username')
        await post?.populate({
            path: 'reviews',
            populate: {
                path: 'user',
                select: 'username'
            }
        })

        res.json(post)
    } catch {
        console.log('Something went wrong!')
    }   
}

export const updatePost = async (req: any, res: any) => {
    const {id, user, content, likes} = req.body
    try {
        const updatedPost: any = await Post.findByIdAndUpdate(id, {
            user,
            content,
            likes
        })
        await updatedPost.save()
        res.json({success: 'Successfully updated!'})
    } catch(err) {
        console.log(err)
        res.json({error: err})
    }
}

export const getReviewCount = async (req: any, res: any) => {
    const {id} = req.params
    try {
        const result = await Review.aggregate( [
            { $match: { post: new mongoose.Types.ObjectId(id) } },
            { $count: "reviewCount" }
        ])
        res.json(result[0])
    } catch(err) {
        console.log(err)
        res.json({error: err})
    }
}