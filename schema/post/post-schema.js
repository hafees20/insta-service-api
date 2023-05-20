import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const postSchema = mongoose.Schema({
    postedBy: {
        type: ObjectId,
        ref: "Users"
    }, img: { type: String },
    caption: { type: String },
    likes: [{ type: ObjectId, ref: "Users" }]
}, { timestamps: true })

const Posts = mongoose.model('posts', postSchema)

export default Posts