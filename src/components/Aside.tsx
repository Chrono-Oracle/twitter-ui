import React from 'react'
import { SearchFieldDemo } from './SearchFieldDemo'
import LatestPost from './LatestPost'

const Aside = () => {
  return (
    <div className='mt-4'>

      <div className='w-[25rem]'>
        <SearchFieldDemo/>

        <LatestPost/>

      </div>


    </div>
  )
}

export default Aside