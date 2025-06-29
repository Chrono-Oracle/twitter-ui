import React from 'react'
import Image from 'next/image'
import { Dot } from 'lucide-react'
import Link from 'next/link'

const LatestPost = () => {
  return (
    <div className='my-[1.5rem] bg-gray-100 dark:bg-transparent py-[1rem] rounded-xl'>
      <h2 className='font-bold px-[1rem] pb-[1rem]'>What is happening</h2>

      <div className='flex gap-2 border-y p-[1rem]'>
        <div>
          <div className='flex text-[.8rem] text-gray-500'>
            <h5>COVID19</h5>
            <Dot/>
            <span>Last night</span>
          </div>
          <p className='font-semibold text-[.9rem]'>England’s Chief Medical Officer says the UK is at the most dangerous time of the pandemic</p>
          <span className='text-[.8rem] text-gray-500'>Trending with <span className='text-[#1DA1F2]'>#covid19</span></span>
        </div>
        <Image className='rounded-md object-cover w-[5rem] h-[5rem]' src="/Placeholder1.png" alt="alt" width={100} height={100} />
      </div>

      <div className='flex gap-2 border-y p-[1rem]'>
        <div>
          <div className='flex text-[.8rem] text-gray-500'>
            <h5>COVID19</h5>
            <Dot/>
            <span>Last night</span>
          </div>
          <p className='font-semibold text-[.9rem]'>England’s Chief Medical Officer says the UK is at the most dangerous time of the pandemic</p>
          <span className='text-[.8rem] text-gray-500'>Trending with <span className='text-[#1DA1F2]'>#covid19</span></span>
        </div>
        <Image className='rounded-md object-cover w-[5rem] h-[5rem]' src="/Placeholder1.png" alt="alt" width={100} height={100} />
      </div>

      <div className='flex gap-2 border-y p-[1rem]'>
        <div>
          <div className='flex text-[.8rem] text-gray-500'>
            <h5>COVID19</h5>
            <Dot/>
            <span>Last night</span>
          </div>
          <p className='font-semibold text-[.9rem]'>England’s Chief Medical Officer says the UK is at the most dangerous time of the pandemic</p>
          <span className='text-[.8rem] text-gray-500'>Trending with <span className='text-[#1DA1F2]'>#covid19</span></span>
        </div>
        <Image className='rounded-md object-cover w-[5rem] h-[5rem]' src="/Placeholder1.png" alt="alt" width={100} height={100} />
      </div>

      <Link className='text-[#1DA1F2] p-[1rem]' href="#">Show more</Link>

    </div>
  )
}

export default LatestPost