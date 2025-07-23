
import connectDB from "../../../db/connectDB";
import Post from "../../../model/Post";
import { NextResponse } from "next/server";
import User from "../../../model/User";

//Get all the users from a database
// This route is used to fetch all users from the database
export const GET = async () => {
  try {
    // comment to the database
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 }).populate("UserId", "Name Email ProfileImage");

    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "An error occurred while processing your request.",
        error,
      }),
      { status: 500 }
    );
  }
};

//adding a user to the database
export const POST = async (req) => {
  try {
    // connect to the database
    await connectDB();

    // get the data from the request body
    const { Content, Mediafile, UserId } = await req.json();

    // get the data from the request body
    const user = await User.findById(UserId);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found." }), {
        status: 404,
      });
    }

    // console.log('existing post',existingPost);

    // create a new post instance
    const newPost = new Post({
      Content,
      Mediafile,
      UserId,
    });
    // save the post to the database

    // Update

    await newPost.save();

    // return the created post as a JSON response
    return new NextResponse(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (error) {
    console.log("Error Creating Post", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to create post, post already exists.",
        error,
      }),
      { status: 500 }
    );
  }
};
