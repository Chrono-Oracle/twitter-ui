import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema (
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
    }, { timestamps: true }
);

export default mongoose.models.Like || mongoose.model("Like", likeSchema);