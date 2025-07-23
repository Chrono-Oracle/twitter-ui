import connectDB from "../../../../db/connectDB";
import User from "../../../../model/User";

import { NextResponse } from "next/server";

// This route is used to fetch a user by their ID from the database
// It connects to the database, retrieves the user, and returns their data
export const GET = async (req, { params }) => {
    const { id } = params; // Extracting the user ID from the request parameters
    try {
        // Connect to the database
        await connectDB();
        
        // Extract the user ID from the request parameters
        // const { id } = params;

        // Find the user by ID, excluding sensitive fields
        const user = await User.findById(id).select('-Password -__v');

        // If no user is found, return a 404 response
        if (!user) {
            return new NextResponse(
                JSON.stringify({ error: 'User not found.' }),
                { status: 404 }
            );
        }

        // Return the user data as a JSON response
        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'An error occurred while processing your request.', error }),
            { status: 500 }
        );
    }
}

// This route is used to delete a user by their ID from the database
// It connects to the database, deletes the user, and returns a success message
export const DELETE = async (req, { params }) => {
    const { id } = params; // Extracting the user ID from the request parameters
    try {
        // Connect to the database
        await connectDB();

        // Find the user by ID and delete them
        const user = await User.findByIdAndDelete(id);

        // If no user is found, return a 404 response
        if (!user) {
            return new NextResponse(
                JSON.stringify({ error: 'User not found.' }),
                { status: 404 }
            );
        }

        // Return a success message as a JSON response
        return new NextResponse(
            JSON.stringify({ message: 'User deleted successfully.' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        return new NextResponse(
            JSON.stringify({ error: 'An error occurred while processing your request.', error }),
            { status: 500 }
        );
    }
}



// This route is used to update a user by their ID in the database
// It connects to the database, updates the user data, and returns the updated user
export const PUT = async (req, { params }) => {
    const { id } = params; // Extracting the user ID from the request parameters
    try {
        // Connect to the database
        await connectDB();

        // Get the updated user data from the request body
        const userData = await req.json();

        // Find the user by ID and update their data, excluding sensitive fields
        const updatedUser = await User.findByIdAndUpdate(id, userData, {
            new: true,
            runValidators: true,
        }).select('-Password -__v');

        // If no user is found, return a 404 response
        if (!updatedUser) {
            return new NextResponse(
                JSON.stringify({ error: 'User not found' }),
                { status: 404 }
            );
        }

        // Return the updated user data as a JSON response
        return new NextResponse(JSON.stringify(updatedUser), { status: 200 });

        
    } catch (error) {
        console.error('Error updating user by ID:', error);
        return new NextResponse(
            JSON.stringify({ error: 'An error occurred while processing your request.', error }),
            { status: 500 }
        );
    }
}