import connectDB from "../../../../db/connectDB";
// import User from "../../../../model/User";
import Post from "../../../../model/Post";

import { NextResponse } from "next/server";

// This route is used to fetch a post by their ID from the database
// It connects to the database, retrieves the post, and returns their data
export const GET = async (req, { params }) => {
    const { id } = params; // Extracting the post ID from the request parameters
    try {
        // Connect to the database
        await connectDB();
        
        // Extract the post ID from the request parameters
        // const { id } = params;

        // Find the post by ID, excluding sensitive fields
        const post = await Post.findById(id).populate('comments');
        // If no post is found, return a 404 response
        if (!post) {
            return new NextResponse(
                JSON.stringify({ error: 'Post not found.' }),
                { status: 404 }
            );
        }

        console.log ('NO POST WITH SUCH ID',post);

        // Return the post data as a JSON response
        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'An error occurred while processing your request.', error }),
            { status: 500 }
        );
    }
}


// This route is used to delete a post by their ID from the database
// It connects to the database, deletes the post, and returns a success message
export const DELETE = async (req, { params }) => {
    const { id } = params; // Extracting the post ID from the request parameters
    try {
        // Connect to the database
        await connectDB();

        // Find the post by ID and delete them
        const post = await Post.findByIdAndDelete(id);

        // If no post is found, return a 404 response
        if (!post) {
            return new NextResponse(
                JSON.stringify({ error: 'Post not found.' }),
                { status: 404 }
            );
        }

        console.log('post',post);

        // Return a success message as a JSON response
        return new NextResponse(
            JSON.stringify({ message: 'Post deleted successfully.' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting post by ID:', error);
        return new NextResponse(
            JSON.stringify({ error: 'An error occurred while processing your request.', error }),
            { status: 500 }
        );
    }
}



// This route is used to update a post by their ID in the database
// It connects to the database, updates the user data, and returns the updated user
export const PUT = async (req, { params }) => {
    const { id } = params; // Extracting the post ID from the request parameters
    try {
        // Connect to the database
        await connectDB();

        // Get the updated user data from the request body
        const postData = await req.json();

        // Find the post by ID and update their data, excluding sensitive fields
        const updatedPost= await Post.findByIdAndUpdate(id, postData, {
            new: true
        });

        // If is not updated, return a 404 response
        if (!updatedPost) {
            return new NextResponse(
                JSON.stringify({ error: 'Post already up-to-date' }),
                { status: 404 }
            );
        }
        console.log('updated post',updatedPost);

        // Return the updated post data as a JSON response
        return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
    } catch (error) {
        console.error('Error updating user by ID:', error);
        return new NextResponse(
            JSON.stringify({ error: 'An error occurred while processing your request.', error }),
            { status: 500 }
        );
    }
}