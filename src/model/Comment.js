import mongoose, { Schema } from "mongoose";


const commentSchema = new Schema (
    {
        UserId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        PostId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        Content: {
            type: String,
            required: true,
        },
        MediaFile: {
            type: String,
            fileType: String,
        },
        Likes: {
            type: Number,
            default: 0,
        },
        Comments: {
            type: Number,
            default: 0,
        },
    }, { timestamps: true }
    );

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);