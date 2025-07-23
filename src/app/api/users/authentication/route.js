import connectDB from "../../../../db/connectDB";
import User from "../../../../model/User";
import bcrypt from "bcryptjs";
// import connectDB from "../../../db/connectDB";
// import User from "../../../model/User";

import { NextResponse } from "next/server";

// GET all users from database


export const POST = async(request) => {
    try {
        await connectDB();
        const {Email, Password} = await request.json();
        console.log("Parsed Email:", Email);
        console.log("Parsed Password:", Password ? "********" : "No Password");
        if(!Email || !Password) {
            console.log("Missing Email or Password");
            return new NextResponse(JSON.stringify({ error: "Email and Password are required" }), {
                status: 500
            });
        }
        const user = await User.findOne({ Email });
        if(!user) {
            console.log("User not found for Email:", Email);
            return new NextResponse(JSON.stringify({ error: "Invalid Email or Password" }), {
                status: 400
            });
        }
        const isPasswordValid = bcrypt.compareSync(Password, user.Password);
        if(!isPasswordValid) {
            console.log("Invalid password for user:", Email);
            return new NextResponse(JSON.stringify({ error: "Invalid Email or Password" }), {
                status: 400
            });
        }
        // Exclude password and __v from the response and authenticate the user
        const { Password: _, ...userData } = user._doc; // Exclude Password from the response
        return new NextResponse(JSON.stringify(userData), {
            status: 200,
        });
        
    } catch(error) {
        console.error("Error during authentication:", error);
        return new NextResponse(JSON.stringify({ error: "Authentication failed" }), {
            status: 500
        });
    }
}