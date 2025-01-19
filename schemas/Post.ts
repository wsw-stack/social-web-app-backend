import mongoose, { Schema } from 'mongoose'

interface IPost extends Document {
  user: Schema.Types.ObjectId;
  content: string;
}

const postSchema = new mongoose.Schema<IPost>({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    maxLength: 1000,
    required: true
  }
})

const Post = mongoose.model('Post', postSchema)
export default Post