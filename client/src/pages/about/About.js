import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-500 to-violet-500'>
      <div className="w-[70%]">
        <div className=" p-2 flex flex-col justify-center ">
          <h1 className=' text-6xl font-extrabold text-violet-900 cursor-default'>
            Social
          </h1>
          <span className='text-2xl cursor-default my-4 '>
            Developed by Parthapratim Deuri 
              <Link 
                to='https://github.com/Partha-deuri' 
                className='text-blue-400'
                >
                  @Partha-deuri
                  </Link>
                 | Only for educational purpose.
          </span>
        </div>
        <Link to={'/'} className='bg-green-500 p-2 font-bold text-white rounded mx-2' >Return Home</Link>
      </div>
    </div>
  )
}

export default About