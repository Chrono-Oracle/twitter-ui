
import connectDB from "../../../db/connectDB";
import Image from "../../../model/Image";

import { v2 as cloudinary } from 'cloudinary';

import { NextResponse } from "next/server";

// Get all images from the database
export const GET = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all images from the database
    const images = await Image.find().sort({ createdAt: -1 });

    // Return the images as a JSON response
    return new NextResponse(JSON.stringify(images), { status: 200 });
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

// add a new image to the database
export const POST = async (request) => {
  try {
    // connect to the database
    await connectDB();
    // get the image data from the request body
    const { image, type, userId, postId } = await request.json();
    const entityId = postId || userId;

    //  Configuration
    cloudinary.config({
      cloud_name: "ding7qcjw",
      api_key: "261828416196125",
      api_secret: "z8mkVdtC4FC-T_h-sRY3ef7_NaU", // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(
        image,
        {
          public_id: type + entityId + new Date().getTime(),
        }
      )
      .catch((error) => {
        console.log(error);
      });

      console.log('image uploaded to cloudinary',uploadResult?.secure_url);


    // create a new image instance
    const newImage = new Image({
      ImageUrl: uploadResult?.secure_url,
      Type: type,
      PostId: postId,
      UserId: userId,
    });

    // Update post with image if it's a post image
    if ( type === 'post' && postId ) {
        await Post.findByIdAndUpdate(postId, {
            MediaFile: {
                url: uploadResult?.secure_url,
                fileTYpe: uploadResult?.resource_type || 'image',
            },
        });
    }

    // save the image to the database
    await newImage.save();

    // send the image to the post by post Id


    // return the created image as a JSON response
    return new NextResponse(JSON.stringify(newImage), { status: 201 });
  } catch (error) {
    console.error("Error adding image:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to add image", error }),
      { status: 500 }
    );
  }
};
