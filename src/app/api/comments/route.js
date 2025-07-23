import connectDB from "../../../db/connectDB";
import { NextResponse } from "next/server";
import Comment from "../../../model/Comment";

// GET: Fetch all comments
export async function GET() {
  try {
    // connect to the database
    await connectDB();
    // fetch all comments from the database
    const comments = await Comment.find({}).sort({ createdAt: -1 });
    // return the comments as a JSON response
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch comments", error }),
      { status: 500 }
    );
  }
}

// POST: Create a new comment
export const POST = async (request) => {
  try {
    // connect to the database
    await connectDB();
    // get the comment data from the request body
    const commentData = await request.json();
    // create a new comment instance
    const newComment = new Comment(commentData);
    console.log("these are the new comment", newComment);
    // save the comment to database
    await newComment.save();
    console.log("new comment", newComment);
    // return the created comment as a JSON response
    return new NextResponse(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create comment", error }),
      {
        status: 500,
      }
    );
  }
};
