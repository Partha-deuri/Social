import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-500 to-violet-500'>
      <div className="w-[70%]">
        <div className=" p-2 flex flex-col justify-center ">
          <h1 className=' text-6xl font-extrabold text-violet-900 cursor-default'>
            404 | Page not Found
          </h1>
          <span className='text-2xl cursor-default my-4 '>
            
          </span>
        </div>
          <Link to={'/'} className='bg-green-500 p-2 font-bold text-white rounded mx-2' >Return Home</Link>
      </div>
    </div>
  )
}

export default PageNotFound 