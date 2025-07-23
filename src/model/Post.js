import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        Content: {
            type: String,
            required: true,
        },
        MediaFile: {
            url: String,
            fileType: String,
        },
        // Likes: {
        //     type: Number,
        //     default: 0,
        // },
        // Comments: {
        //     type: Number,
        //     default: 0,
        // },
    }, { timestamps: true }
    );

export default mongoose.models.Post || mongoose.model("Post", postSchema);