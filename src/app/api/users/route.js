import connectDB from "../../../db/connectDB";
import User from "../../../model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//Get all the users from a database
// This route is used to fetch all users from the database
export const GET = async () => {
    try {
        // comment to the database
        await connectDB ();
        const users = await User.find({}, '-Password -__v').sort({ createdAt: -1 });
        return new NextResponse(
            JSON.stringify(users), { status: 200 }
        )
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'An error occurred while processing your request.',error }),
            { status: 500 });
        }
};


//adding a user to the database
export const POST = async (request) => {
    try {
        // connect to the database
        await connectDB();
        // get the data from the request body
        const userData = await request.json();

        // deconstruct
        const { Email, Phone, Password } = userData;
        // check if the user already exists
        const existingUser = await User.findOne({
            $or: [{ Email }, { Phone }]
        })
        // if the user already exists, return an error response
        if (existingUser) {
            return new NextResponse(
                JSON.stringify({
                    error: existingUser.Email === Email? "Email already exists." : "Phone number already exists."
                }),
                { status: 409 } // Conflict status code
            )
        };

        const hashedPassword = bcrypt.hashSync(Password, 10);

        // create a new user instance
        const newUser = new User({...userData, Password: hashedPassword});
        // save the user to the database
        await newUser.save();
        // return the created user as a JSON response
        return new NextResponse(JSON.stringify(newUser), { 
            status: 201 
        });
    }   catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'Failed to create user, try again.', error }),
            { status: 500 }
        );
    }
}