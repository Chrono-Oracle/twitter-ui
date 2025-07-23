'use client';
import { useRef, useState } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { AiOutlineGif } from 'react-icons/ai';
import { PiChartBarHorizontal } from 'react-icons/pi';
import { VscSmiley } from 'react-icons/vsc';
import { TbCalendarTime } from 'react-icons/tb';
import { MdClose } from 'react-icons/md'; // ❌ icon

export default function MakePost() {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

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
    fileInputRef.current.value = null;
  };

return (
    <div>
      {/* <div className='flex gap-2 items-center px-[3%] py-[1%] text-[.85rem]'>
        <img src='/Profile Picture.png' alt='profile' className='rounded-full w-10 h-10' />
        <input placeholder="What's happening?" className='text-gray-500 font-semibold outline-none'/>
      </div> */}


  {/* Image Preview + Remove Button */}
  {previewImage && (
    <div className="relative px-[3%] pb-2">
      <img
        src={previewImage}
        alt="Preview"
        className="rounded-lg w-full max-h-[300px] object-cover  border"
      />
      <button
        onClick={resetImage}
        className="bg-primary absolute top-2 right-6  hover:bg-red-500 rounded-full p-1"
      >
        <MdClose size={18} className="text-white" />
      </button>
    </div>
  )}

  <div className='flex items-center justify-between px-[2%] pb-[2%]'>
    <ul className='flex gap-3 items-center px-[7.5%]'>
      <li onClick={handleImageClick} className="cursor-pointer">
        <HiOutlinePhotograph size={25} className='text-primary' />
      </li>
      <li><AiOutlineGif size={25} className='text-primary' /></li>
      <li><PiChartBarHorizontal size={25} className='text-primary' /></li>
      <li><VscSmiley size={25} className='text-primary' /></li>
      <li><TbCalendarTime size={25} className='text-primary' /></li>
    </ul>
    <button className='bg-primary rounded-full font-medium py-2.5 px-6 text-[.9rem] text-white'>Tweet</button>
  </div>

  {/* Hidden input */}
  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={handleFileChange}
    className="hidden"
  />
</div>



);
}