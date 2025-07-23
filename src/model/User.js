import mongoose, { Schema } from "mongoose";

const userSchema = new Schema (
    {
        Name : {
            type: String,
            required: true,
        },
        Email : {
            type: String,
            required: true,
            unique: true,
        },
        Password : {
            type: String,
            required: true,
        },
        ProfileImage : {
            type: String,
        },
        CoverImage : {
            type: String,
        },
        Bio : {
            type: String,
        },
        Location : {
            type: String,
        },
        Phone : {
            type: String,
            unique: true,
        },
        DateOfBirth : {
            type: Date,
        },
    },  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);