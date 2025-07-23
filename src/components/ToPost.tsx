'use client'

// import React, { use } from 'react'
import { CalendarCheck2, ChartBar, Image, ImagePlay, Smile, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { UserButton } from "@clerk/nextjs";

import { useState } from 'react'

import  { PhotoUpload }  from "@/components/PhotoUpload"

const ToPost = () => {

  const [show, toggleShow] = useState(true);

  return (
    <div>
      <div className='flex justify-between py-[1rem] px-[.6rem] border-b-2'>
        <Link className='font-bold' href="#">Home</Link>
        <Sparkles stroke='#1DA1F2' strokeWidth={1.5} />
      </div>

      <div className='flex gap-[1rem] py-[1rem] px-[.6rem]'>
        <Avatar>
          <UserButton />
        </Avatar>
        <div className='w-full grid gap-y-[.5rem]'>
          <Input/>
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <Button 
                className='bg-transparent text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white'
                onClick={() => toggleShow(!show)}
                > <Image /> 
                {show ? "" : ""}
              </Button>
              <Button className='bg-transparent text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white'> <ImagePlay/> </Button>
              <Button className='bg-transparent text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white'> <ChartBar/> </Button>
              <Button className='bg-transparent text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white'> <Smile /> </Button>
              <Button className='bg-transparent text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white'> <CalendarCheck2/> </Button>
            </div>
            <Button className='bg-[#1DA1F2] text-white'>Tweet</Button>
          </div>
          <div className='mt-[.5rem]'>
            { show && <PhotoUpload />}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ToPost