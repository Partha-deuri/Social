import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../zustand';
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore(s => s.setUser);
  const setToken = useUserStore(s => s.setToken);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`/auth/login`, { email, password })
      setUser(res.data.data);
      setToken(res.data.token);
      // navigate('/');
    } catch (err) {
      console.log(err)
      if (err?.response?.data)
        toast.error(err.response.data);
    }
    setLoading(false);
  }


  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-500 to-violet-500'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className="w-[70%] flex gap-4 md:flex-row flex-col justify-around ">
        <h1 className='text-center md:hidden text-8xl font-extrabold text-violet-900 cursor-default'>Social</h1>
        <div className="w-3/5 p-2 md:flex flex-col justify-center hidden">
          <h1 className=' text-8xl font-extrabold text-violet-900 cursor-default'>Social</h1>
          <span className='text-2xl cursor-default'>
            It is a basic social media project for learning purpose only
          </span>
        </div>
        <div className="w-full md:w-2/5  border-2 shadow-xl rounded-lg ">
          <form onSubmit={handleLogin} className="p-4 ">
            <input type="email"
              onChange={e => setEmail(e.target.value)}
              className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
              placeholder='Email'
              autoFocus
            />
            <input type="password"
              onChange={e => setPassword(e.target.value)}
              className='border my-2 w-full border-black rounded text-xl p-2 bg-transparent'
              placeholder='Password'
            />
            <button
              className='text-2xl font-semibold text-center w-full bg-violet-700 rounded p-1 mt-4 text-white hover:bg-violet-500'>
              {
                loading ? "Verifying..." : "Login"
              }
            </button>
          </form>
          <div className='mx-4 border-b-2 mb-2 border-slate-600 flex justify-center pb-2'>
            <Link to={'/forgot-password'} className='text-cyan-500 cursor-pointer'>Forgotten Password?</Link>
          </div>
          <div className="px-4 flex justify-center">
            <Link to={'/register'} className='text-xl font-semibold text-center px-6 py-2 bg-lime-600 rounded p-1 my-2 text-white hover:bg-lime-500'>
              Create New Account
            </Link>
          </div>
          <div className="flex justify-center my-2">
            <span className='text-sm'>Created by Partha</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login