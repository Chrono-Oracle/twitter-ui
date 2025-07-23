'use client';

import { useState, useEffect } from 'react';

import { ArrowLeft, CalendarDays, MapPin, Dot, MessageCircle, Repeat2, Heart, Upload } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { UserButton } from "@clerk/nextjs";

import Link from 'next/link';
import Image from 'next/image';


import Aside from "@/components/Aside";

// import { User } from '@clerk/nextjs/server';
import { Button } from '../ui/button';
import { DialogDemo } from './DialogDemo';

interface ProfileData {
  name: string;
  username: string;
  bio: string;
  location: string;
}



const ProfileContents = () => {

    const [profile, setProfile] = useState<ProfileData>(() => {
      // Only run in browser environment
      if (typeof window !== 'undefined') {
        const savedProfile = localStorage.getItem('profile');
        return savedProfile 
          ? JSON.parse(savedProfile) 
          : {
              name: "Danny Biscuit",
              username: "@oraclex",
              bio: "Full Stack Web Designer",
              location: "Douala"
            };
      }
      return {
        name: "Danny Biscuit",
        username: "@oraclex",
        bio: "Full Stack Web Designer",
        location: "Douala"
      };
    });

    // const handleProfileUpdate = (newData: ProfileData) => {
    //   console.log("New data received:", newData);
    //   setProfile(prev => ({
    //     ...prev,      // Keep existing values
    //     ...newData    // Apply updates
    //   }));
    // };

    const handleProfileUpdate = (newData: ProfileData) => {
  // Merge existing profile with new data
      const updatedProfile = { ...profile, ...newData };
      
      // Update state
      setProfile(updatedProfile);
      
      // Update localStorage
      localStorage.setItem('profile', JSON.stringify(updatedProfile));
      console.log("Profile updated and saved:", updatedProfile);
    };

    useEffect(() => {
      localStorage.setItem('profile', JSON.stringify(profile));
      console.log("Profile saved to localStorage:", profile);
    }, [profile]);


  return (
    <div className="">


        <section id='main'>
            <div className="">
                {/* Profile Return Navigation */}
                <div className='py-[1rem] px-[2rem] flex items-center gap-x-[1.5rem]'>
                    <Link href="/home">
                        <ArrowLeft stroke='#1DA1F2' width={17}/>
                    </Link>
                    <div className="leading-[.9rem]">
                        <h5 className="text-[.9rem] font-bold">Name</h5>
                        <span className="text-[.7rem]">9 Tweets</span>
                    </div>
                </div>
                {/* Profile Return Navigation */}


                {/* Profile Contents */}
                <div className="relative">

                    {/* Profile Background */}
                    <div id='profile-bg' className="bg-amber-500 h-[15rem]">
                        {/* <img className=' h-[15rem]' src="/Bg1.jpg" alt="alt"/> */}

                        <Avatar className="absolute top-[11rem] left-5 bg-amber-400 rounded-full w-[8rem] h-[8rem]">
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: {
                                        width: '8rem', // Adjust as needed, e.g., '64px', '3em'
                                        height: '8rem', // Keep width and height consistent for a circular avatar
                                        },
                                        // You can also style other elements of the UserButton if needed
                                        // userButtonPopoverCard: {
                                        //   backgroundColor: 'lightblue',
                                        // },
                                    },
                                    }} 
                            />
                        </Avatar>
                    </div>
                    {/* Profile Background */}

                    <div className="grid justify-items-end my-5">
                        {/* <Button className='bg-transparent rounded-3xl text-[#1DA1F2] border border-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white hover:cursor-pointer'>Edit Profile</Button> */}
                        <DialogDemo
                            profile={profile} 
                            onSave={handleProfileUpdate}
                        />
                    </div>

                    {/* User Bio */}
                    <div className="grid gap-y-2">
                        <div className="">
                            <h4 className="text-[1.3rem] font-medium">{profile.name}</h4>
                            <span className="text-gray-500">{profile.username}</span>
                        </div>
                        <div className="grid gap-y-1">
                            <h5 className="text-[.9rem] font-medium">{profile.bio}</h5>
                            <div className="flex gap-x-6">
                                <div className="flex items-center gap-x-1 text-gray-500">
                                    <MapPin width={15}/>
                                    <span className="text-[.8rem]">{profile.location}</span>
                                </div>
                                <div className="flex items-center gap-x-1 text-gray-500">
                                    <CalendarDays width={15}/>
                                    <span className="text-[.8rem]">Joined January 2023</span>
                                </div>
                            </div>
                            <div className="flex gap-x-2 text-[.85rem]">
                                <span className="font-semibold">58M <span className="text-gray-500">Followers</span></span>
                                <span className="font-semibold">150 <span className="text-gray-500">Following</span></span>
                            </div>
                        </div>
                    </div>
                    {/* User Bio */}


                    {/* User Profile Navigation */}
                    <div className="mt-8">
                        <ul className="flex justify-between px-6 pb-4 border-b">
                            <li className="">
                                <Link href="href">Tweets</Link>
                            </li>
                            <li className="">
                                <Link href="href">Tweets & replies</Link>
                            </li>
                            <li className="">
                                <Link href="href">Media</Link>
                            </li>
                            <li className="">
                                <Link href="href">Likes</Link>
                            </li>
                        </ul>
                    </div>
                    {/* User Profile Navigation */}

                    {/* Posts */}
                    <div className='w-full grid mt-4 gap-y-[.8rem]'>
                            <div className='flex items-center gap-[1rem]'>
                              <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='flex gap-2'>
                                  <h5 className='font-semibold text-[.9rem]'>Devon Lane</h5>
                                  <div className='flex items-center text-[.9rem] text-gray-500'>
                                    <h6>@johndue</h6>
                                    <Dot/>
                                    <span className='text-[.8rem]'>23s</span>
                                  </div>
                                </div>
                                <p className='text-[.9rem]'>Tom is in a big hurry, stuipp.</p>
                              </div>
                            </div>
                    
                            <div className='ml-[3rem]'>
                              <Image className='w-full object-cover rounded-xl' src="/Post1.jpg" alt="alt" width={500} height={500} />
                            </div>
                    
                            <div className='ml-[3rem] flex justify-between w-[80%]'>
                              <Button className='bg-transparent text-gray-500 hover:bg-transparent'>
                                <MessageCircle/>
                                <span>61</span>
                              </Button>
                              <Button className='bg-transparent text-gray-500 hover:bg-transparent'>
                                <Repeat2 />
                                <span>12</span>
                              </Button>
                              <Button className='bg-transparent text-gray-500 hover:bg-transparent'>
                                <Heart/>
                                <span>6.2K</span>
                              </Button>
                              <Button className='bg-transparent text-gray-500 hover:bg-transparent'>
                                <Upload/>
                                <span>61</span>
                              </Button>
                            </div>
                    
                            <Link className='ml-[3rem] text-[#1DA1F2] text-[.8rem]' href="#">Show this thread</Link>
                    
                          </div>
                    {/* Posts */}

                </div>
                {/* Profile Contents */}

            </div>
            <div className=""><Aside/></div>
        </section>

    </div>
  )
}

export default ProfileContents