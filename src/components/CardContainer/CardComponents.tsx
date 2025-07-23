import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dot, Heart, MessageCircle, Repeat2, Upload } from 'lucide-react'
import Link from 'next/link'

import Image from 'next/image'
import { Button } from '../ui/button'

const CardComponents = () => {
  return (
    <div className='px-[0.6rem] grid gap-y-[2rem] mt-[1rem]'>

      <div className='w-full grid gap-y-[.8rem]'>
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



      <div className='w-full grid gap-y-[.8rem]'>
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
          <Image className='w-full object-cover rounded-xl' src="/Post2.jpg" alt="alt" width={500} height={500} />
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



    </div>
  )
}

export default CardComponents