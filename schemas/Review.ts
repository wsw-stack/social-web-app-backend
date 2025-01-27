import mongoose, { Schema } from 'mongoose'

interface IReview extends Document {
    user: Schema.Types.ObjectId;
    content: string;
    likes: Schema.Types.ObjectId[],
    replies: Schema.Types.ObjectId[]
}

const reviewSchema = new mongoose.Schema<IReview>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        maxLength: 1000,
        required: true
    },
    likes: {
        type: [Schema.Types.ObjectId]
    },
    replies: {
        type: [Schema.Types.ObjectId],
        ref: 'Review'
    }
})

const Review = mongoose.model<IReview>('Review', reviewSchema)
export default Review