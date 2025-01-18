import Post from "../schemas/Post"

export const sendNewPost = async (req: any, res: any) => {
    const {userId, content} = req.body
    try{
        const newPost: any = new Post({
            userId,
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