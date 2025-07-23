import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dot, Heart, MessageCircle, Repeat2, Upload } from 'lucide-react'
import Link from 'next/link'

import {
  useQuery
} from '@tanstack/react-query'

import Image from 'next/image'
import { Button } from '../ui/button'
import { BASE_URL } from '@/lib/utils'

const CardComponents = () => {

  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn:  () => 
        fetch(`${BASE_URL}/posts/`).then((res) =>
          res.json(),
        ),
  })
    
    if (isPending) return (
      <div className="flex flex-col gap-4 px-[3%] py-[2%] animate-pulse">
      {/* Profile + Name */}
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-40 bg-gray-300 rounded" />
          <div className="h-3 w-64 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Image section */}
      <div className="pl-[7.5%] text-[.85rem] flex flex-col gap-4">
        <div className="w-full h-60 bg-gray-300 rounded-2xl border" />

        {/* Action icons */}
        <ul className="flex gap-6 items-center justify-between w-[80%]">
          <li className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="w-6 h-3 bg-gray-300 rounded" />
          </li>
          <li className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="w-6 h-3 bg-gray-300 rounded" />
          </li>
          <li className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="w-10 h-3 bg-gray-300 rounded" />
          </li>
          <li className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="w-6 h-3 bg-gray-300 rounded" />
          </li>
        </ul>

        <div className="h-3 w-32 bg-gray-300 rounded" />
      </div>
    </div>)



    if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='px-[0.6rem] grid gap-y-[2rem] mt-[1rem]'>

      {data.map(post => 
        <div key={post?._id} className='w-full grid gap-y-[.8rem]'>
        <div className='flex items-center gap-[1rem]'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className='flex gap-2'>
              <h5 className='font-semibold text-[.9rem]'>{post.UserId.Name}</h5>
              <div className='flex items-center text-[.9rem] text-gray-500'>
                <h6>@{post.UserId?.Name.toLowerCase().trim().replace(/\s+/g, '')}</h6>
                <Dot/>
                <span className='text-[.8rem]'>23s</span>
              </div>
            </div>
            <p className='text-[.9rem]'>{post.Content}</p>
          </div>
        </div>

        <div className='ml-[3rem]'>
          <Image className='w-full object-cover rounded-xl' src={post.MediaFile.url} alt="alt" width={500} height={500} />
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
      )}



      {/* <div className='w-full grid gap-y-[.8rem]'>
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

      </div> */}



    </div>
  )
}

export default CardComponents