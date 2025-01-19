import Post from "../schemas/Post"

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
            const populatedPosts = await post.populate('user')
            console.log(populatedPosts)
            allPopulatedPosts.push(populatedPosts)
        }
        res.json({posts: allPopulatedPosts})
    }
    catch(err) {
        res.json({error: err})
    }
}