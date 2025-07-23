'use client';
import { useRef, useState, useEffect } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { AiOutlineGif } from 'react-icons/ai';
import { PiChartBarHorizontal } from 'react-icons/pi';
import { VscSmiley } from 'react-icons/vsc';
import { TbCalendarTime } from 'react-icons/tb';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { BASE_URL } from '@/lib/utils';

import { useQueryClient } from '@tanstack/react-query';

import EmojiPicker from 'emoji-picker-react';

export default function ToPost({initialContent=''}) {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const queryClient = useQueryClient()
  // const [inputValue, setInputValue] = useState(content ||'');

  // Load user once on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !previewImage) {
      return; // Nothing to submit
    }

    setIsLoading(true);

    const PostPayload = {
      Content: content,
      UserId: user?._id
    };

    try {
      const postResponse = await axios.post(`${BASE_URL}/posts`, PostPayload);
      const newPostId = postResponse.data._id;

      setContent('');

      if (previewImage) {
        const MediaPayload = {
          image: previewImage,
          userId: user?._id,
          type: "post",
          postId: newPostId
        };

        await axios.post(`${BASE_URL}/images`, MediaPayload);
        resetImage();
        toast.success("Post Created Successfully");
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    } catch (error) {
      console.error("Error submitting post or uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  
    
  

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  }

  return (
    <div>
      {/* Post Input */}
      <form className="flex gap-2 items-center px-[3%] py-[1%] text-[.85rem]">
        <img
          src="/Profile Picture.png"
          alt="Profile"
          className="rounded-full w-10 h-10"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          aria-label="Tweet content"
          className="text-gray-500 font-semibold outline-none flex-1"
        />
      </form>

      {/* Image Preview with Close Button */}
      {previewImage && (
        <div className="relative px-[3%] pb-2">
          <img
            src={previewImage}
            alt="Preview"
            className="rounded-lg w-full max-h-[300px] object-cover border"
          />
          <button
            onClick={resetImage}
            className="bg-primary absolute top-2 right-6 hover:bg-red-500 rounded-full p-1"
            aria-label="Remove image"
          >
            <MdClose size={18} className="text-white" />
          </button>
        </div>
      )}

      {/* Actions & Submit */}
      <div className="flex items-center justify-between px-[2%] pb-[2%]">
        <ul className="flex gap-3 items-center px-[7.5%]">
          <li onClick={handleImageClick} className="cursor-pointer">
            <HiOutlinePhotograph size={25} className="text-primary" />
          </li>
          <li><AiOutlineGif size={25} className="text-primary" /></li>
          <li><PiChartBarHorizontal size={25} className="text-primary" /></li>
          <li><div className='cursor-pointer' onClick={togglePicker}>
              <VscSmiley size={25} className="text-primary" />
            </div>
          </li>
          <li><TbCalendarTime size={25} className="text-primary" /></li>
        </ul>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`bg-primary rounded-full font-medium py-2.5 px-6 text-[.9rem] text-white transition duration-200 cursor-pointer ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Posting...' : 'Tweet'}
        </button>
      </div>

       {showPicker && (
          <div className=''>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
         

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}