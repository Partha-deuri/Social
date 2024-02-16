import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-500 to-violet-500'>
      <div className="w-[70%] flex gap-4 justify-around ">
        <div className="w-3/5 p-2 flex flex-col justify-center ">
          <h1 className=' text-8xl font-extrabold text-violet-900 cursor-default'>Social</h1>
          <span className='text-2xl cursor-default'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium tempore mollitia fuga ea, repellendus eos?</span>
        </div>
        <div className="w-2/5  border-2 shadow-xl rounded-lg ">
          <div className="p-4 ">
            <input type="text"
              className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
              placeholder='Username'
            />
            <input type="text"
              className='border my-2 w-full border-black rounded text-xl p-2 bg-transparent'
              placeholder='Email'
            />
            <input type="text"
              className='border my-2 w-full border-black rounded text-xl p-2 bg-transparent'
              placeholder='Password'
            />
            <input type="text"
              className='border my-2 w-full border-black rounded text-xl p-2 bg-transparent'
              placeholder='Confirm Password'
            />
            <button className='text-2xl font-semibold text-center w-full bg-violet-700 rounded p-2 mt-4 text-white hover:bg-violet-500'>
              Sign Up
            </button>
          </div>
          <div className='mx-4 border-b-2 mb-2 border-slate-600 flex justify-center pb-2'>
            <Link to={'/login'} className='text-cyan-500 cursor-pointer'>Already have account?</Link>
          </div>
          <div className="flex justify-center my-2">
            <span className=''>Created by Partha</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register