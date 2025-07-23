import mongoose, { Schema } from "mongoose";


const imageSchema = new Schema(
    {
        Image: {
            type: String,
            required: true,
        },
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        PostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        },
        Type: {
            type: String,
            enum: ['profile', 'cover', 'post'],
            required: true,
        },
    }, { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.models.Image || mongoose.model("Image", imageSchema);
