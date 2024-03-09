
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../zustand';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [otpId, setOtpId] = useState();
  const emailRef = useRef();
  const otp = useRef();
  const username = useRef();
  const fullname = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const setUser = useUserStore(s => s.setUser);
  const navigate = useNavigate();
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFirst = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // check email existance and send otp
      setEmail(emailRef.current.value.trim());
      const res = await axios.get(`/auth/email/${emailRef.current.value.trim()}`);
      if (res.data?.msg === "all ok") {
        setOtpId(res.data.otpId);
        setFirst(false);
        setSecond(true);
      } else {
        console.log(res.data.msg)
      }
      setLoading(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  const FirstSignup = () => {
    return (
      <form className="p-4 " onSubmit={handleFirst}>
        <input type="email"
          ref={emailRef}
          className='border my-2 w-full border-black rounded text-xl p-2 bg-transparent'
          required
          placeholder='Email'
          autoFocus
          inputMode='email'
        />
        <button
          className={`text-2xl font-semibold text-center w-full bg-violet-700 rounded p-2 mt-4 text-white hover:bg-violet-500 ${loading && "cursor-not-allowed"}`}>
          {loading ? "Loading" : "Send OTP"}
        </button>
      </form>
    )
  }

  const handleSecond = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // verify otp 
      if (otp.current.value.length === 6) {
        const res = await axios.post(`/auth/otp`, {
          otpId, 
          otp: otp.current.value,
          email
        })
        if (res.data.msg === "success") {
          setSecond(false);
          setThird(true);
        }
      } else {
        console.log("otp should be of exactly 6-digit")
      }
      setLoading(false);
    } catch (err) {
      if (err.response.status === 403) {
        console.log("otp  mismatch");
      } else {
        console.log(err)
      }
      setLoading(false);
    }
  }
  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/auth/email/${email}`);
      if (res.data?.msg === "all ok") {
        setOtpId(res.data.otpId);
        setFirst(false);
        setSecond(true);
      } else {
        console.log(res.data.msg)
      }
      setLoading(false);
    } catch (err) {
      console.log(err)
      setLoading(false);
    }
  }
  const handleWrongEmail = () => {
    try {
      // send wrong email
      setEmail("");
      setSecond(false);
      setFirst(true);
    } catch (err) {
      console.log(err)
    }
  }
  const SecondSignup = () => {
    return (
      <form className="p-4 " onSubmit={handleSecond}>
        <div className='text-white'> {`A 6-digit otp has been sent to `}
          <span className="font-semibold text-lime-400 text-xl">{email}</span>
        </div>
        <div className="flex justify-between">
          <div
            onClick={handleWrongEmail}
            className='text-cyan-500 cursor-pointer'
          >
            wrong email?
          </div>
          <div
            onClick={handleResendOtp}
            className='text-cyan-500 cursor-pointer'
          >
            resend otp?
          </div>
        </div>
        <input type="number"
          ref={otp}
          className='border my-2 w-full border-black rounded text-xl p-2 bg-transparent '
          required
          placeholder='Enter 6-digit OTP'
          autoFocus
          inputMode='numeric'
        />
        <button type='submit'
          className={`text-2xl font-semibold text-center w-full bg-violet-700 rounded p-2 mt-4 text-white hover:bg-violet-500}  ${loading && "cursor-not-allowed"}`}>
          {loading ? "Loading..." : "Confirm OTP"}
        </button>
      </form>
    )
  }

  const handleThird = async () => {
    try {
      setLoading(true);
      const uname = username.current.value
      const fname = fullname.current.value
      const pswrd = password.current.value
      const cnfPswd = confirmPassword.current.value
      if (cnfPswd === pswrd) {
        // validate username
        const res = await axios.get(`/auth/username/${username.current.value.trim()}`);
        console.log(res)
        if (res.data?.msg === "username exist") {
          // create account
          const res2 = await axios.post(`/auth/register`, {
            username: uname,
            fullname: fname,
            password: pswrd,
            email,
          })
          // set user
          setUser(res2.data);
          // sign in
          // redirect to edit profile
          navigate('/editprofile');
        } else {
          console.log(res.data);
          setTimeout(() => {
            fullname.current.value = fname;
            password.current.value = pswrd;
            confirmPassword.current.value = cnfPswd;
          }, 10)
        }
      } else {
        console.log("password mismatch")
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  const ThirdSignup = () => {
    return (
      <div className="p-4 " >
        <input type="text"
          ref={username}
          className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
          autoFocus
          required
          placeholder='Username'
        />
        <input type="text"
          ref={fullname}
          className='border my-2 w-full border-black rounded text-xl p-2 bg-transparent'
          required
          placeholder='Full Name'
          autoCapitalize='on'
        />
        <input type="password"
          ref={password}
          className='border my-2 w-full border-black rounded text-xl p-2 bg-transparent'
          required
          placeholder='Password'
        />
        <input type="password"
          ref={confirmPassword}
          className='border my-2 w-full border-black rounded text-xl p-2 bg-transparent'
          required
          placeholder='Confirm Password'
        />
        <button
          onClick={handleThird}
          className='text-2xl font-semibold text-center w-full bg-violet-700 rounded p-2 mt-4 text-white hover:bg-violet-500'>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </div >

    )
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-500 to-violet-500'>
      <div className="w-[70%] flex md:flex-row flex-col gap-4 justify-around ">
          <h1 className='md:hidden text-8xl font-extrabold text-violet-900 cursor-default text-center'>Social</h1>
        <div className="hidden w-3/5 p-2 md:flex flex-col justify-center ">
          <h1 className=' text-8xl font-extrabold text-violet-900 cursor-default'>Social</h1>
          <span className='text-2xl cursor-default'>
            It is a basic social media project for learning purpose only
          </span>
        </div>
        <div className=" md:w-2/5  border-2 shadow-xl rounded-lg flex flex-col justify-end">
          {first && <FirstSignup />}
          {second && <SecondSignup />}
          {third && <ThirdSignup />}
          <div className='mx-4 border-b-2 mb-2 border-slate-600 flex justify-center pb-2'>
            <Link to={'/login'} className='text-cyan-500 cursor-pointer'>Already have account?</Link>
          </div>
          <div className="flex justify-center my-2">
            <span className='text-sm font-bold'>Created by Partha</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register 