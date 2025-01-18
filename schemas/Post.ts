import mongoose, { Schema } from 'mongoose'

interface IPost extends Document {
  userId: Schema.Types.ObjectId;
  content: string;
}

const postSchema = new mongoose.Schema<IPost>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    maxLength: 1000,
    required: true
  }
})

const Post = mongoose.model('Post', postSchema)
export default Post