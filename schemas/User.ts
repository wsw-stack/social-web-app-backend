import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IUser extends Document {
    username: string
    email: string
    password: string
    introduction?: string
    following: Schema.Types.ObjectId[]
    followers: Schema.Types.ObjectId[]
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    introduction: {
        type: String,
        maxLength: 250,
        default: "",
    },
    following: {
        type: [Schema.Types.ObjectId],
        ref: "User",
    },
    followers: {
        type: [Schema.Types.ObjectId],
        ref: "User",
    },
});

userSchema.plugin(uniqueValidator, { message: "{Username} is not unique" });
const User = mongoose.model<IUser>("User", userSchema);

export default User;
