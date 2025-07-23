import connectDB from './../../../../db/connectDB';
import Comment from "../../../../model/Comment";
// import Post from "../../../../model/Post";
import { NextResponse } from "next/server";
// import User from "../../../../model/User";

// GET: Get a comment by ID
export const GET = async (req, { params }) => {
    const { id } = await params; // Extracting the comment ID from the request parameters
    try {
        // Connect to the database
        await connectDB();

        // Extract the comment ID from the request parameters
        // const { id } = params;\

        // Find the comment by ID, excluding sensitive fields
        const comment = await Comment.find({ PostId: id }).sort({ createdAt: -1 }).populate('UserId', 'Name ProfileImage');

        // If no comment is found, return a 404 response
        if (!comment) {
            return new NextResponse(
                JSON.stringify({ error: 'Comment not found.' }),
                { status: 404 }
            );
        }

        console.log ('NO COMMENT WITH SUCH ID',comment);

        // Return the comment data as a JSON response
        return new NextResponse(JSON.stringify(comment), { status: 200 });
    } catch (error) {
        console.error('Error getting comment by ID:', error);
        return new NextResponse(
            JSON.stringify({ error: 'An error occurred while processing your request.', error }),
            { status: 500 }
        );
    }
}

// This route is used to delete a comment by their ID from the database
// It connects to the database, deletes the comment, and returns a success message
export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await connectDB();
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return new NextResponse('error: No comments found', { status: 404 });
    }

    // Decrement post's comment count
    // await Post.findByIdAndUpdate(
    //   comment.PostId,
    //   { $inc: { commentCount: -1 } }
    // );

    return new NextResponse('Comment deleted successfully', { status: 200 });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return new NextResponse('Server Error', { status: 500 });
  }
}

// This route is used to update a comment by their ID in the database
// It connects to the database, updates the user data, and returns the updated user
export const PUT = async (req, { params }) => {
    const { id } = params; // Extracting the comment ID from the request parameters
    try {
        // Connect to the database
        await connectDB();

        // Get the updated user data from the request body
        const updatedData = await req.json();

        // Find the comment by ID and update their data, excluding sensitive fields
        const updatedComment = await Comment.findByIdAndUpdate(id, updatedData, {
            new: true
        });

        // If no comment is found, return a 404 response
        if (!updatedComment) {
            return new NextResponse(
                JSON.stringify({ error: 'Comment not found' }),
                { status: 404 }
            );
        }
        console.log('updated comment',updatedComment);

        // Return the updated comment data as a JSON response
        return new NextResponse(JSON.stringify(updatedComment), { status: 200 });
    } catch (error) {
        console.error('Error updating comment by ID:', error);
        return new NextResponse(
            JSON.stringify({ error: 'An error occurred while processing your request.', error }),
            { status: 500 }
        );
    }
}