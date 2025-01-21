import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    _id: String,
    cookie: {
        path: String,
        _expires: Date,
        originalMaxAge: Number,
        httpOnly: Boolean,
        secure: Boolean,
        sameSite: String,
    },
    user: mongoose.Schema.Types.ObjectId
});

const Session = mongoose.model('Session', sessionSchema, 'sessions');
export default Session
