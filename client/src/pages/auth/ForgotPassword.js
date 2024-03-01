import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [otpConfirm, setOtpConfirm] = useState(false);


    const sendOtp = (e) => {
        e.preventDefault();
        setOtpSent(true);
    }
    const confirmOtp = (e) => {
        e.preventDefault();
        setOtpConfirm(true);
    }
    const handleWrongEmail = () => {
        setOtpSent(false);
        setOtpConfirm(false);
    }

    const InputArea = () => {
        return (
            <div className="p-4 ">
                <input type="text"
                    className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
                    placeholder='Username or Email'
                />
                <button
                    onClick={(e) => sendOtp(e)}
                    className='text-2xl font-semibold text-center w-full bg-violet-700 rounded p-2 mt-4 text-white hover:bg-violet-500'>
                    Send OTP
                </button>
            </div>
        )
    }

    const OtpArea = () => {
        return (
            <div className="p-4 ">
                <span> A 6-digit otp has been sent to test@abc.com </span>
                <button
                    onClick={handleWrongEmail}
                    className='text-cyan-500 cursor-pointer'> wrong email? </button>
                <input type="text"
                    className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
                    placeholder='Enter OTP'
                />
                <button
                    onClick={(e) => confirmOtp(e)}
                    className='text-2xl font-semibold text-center w-full bg-violet-700 rounded p-2 mt-4 text-white hover:bg-violet-500'>
                    Confirm OTP
                </button>
            </div>
        )
    }

    const PasswordArea = () => {
        return (
            <div className="p-4 ">
                <span>Enter new Password</span>
                <input type="text"
                    className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
                    placeholder='New Password'
                />
                <input type="text"
                    className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
                    placeholder='Confirm New Password'
                />
                <button className='text-2xl font-semibold text-center w-full bg-violet-700 rounded p-2 mt-4 text-white hover:bg-violet-500'>
                    Confirm
                </button>
            </div>
        )
    }
    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-fuchsia-500 to-violet-500'>
            <div className="w-[70%] flex gap-4 flex-col md:flex-row justify-around ">
                <h1 className='md:hidden text-center text-8xl font-extrabold text-violet-900 cursor-default'>Social</h1>
                <div className="hidden w-3/5 p-2 md:flex flex-col justify-center ">
                    <h1 className=' text-8xl font-extrabold text-violet-900 cursor-default'>Social</h1>
                    <span className='text-2xl cursor-default'>
                        It is a basic social media project for learning purpose only

                    </span>
                </div>
                <div className="md:w-2/5  border-2 shadow-xl rounded-lg ">
                    {
                        !otpSent ? <InputArea /> : !otpConfirm ? <OtpArea /> : <PasswordArea />
                    }
                    <div className='mx-4 border-b-2 mb-2 border-slate-600 flex justify-center pb-2'>
                        <Link to={'/login'} className='text-cyan-500 cursor-pointer'>Return to Login</Link>
                    </div>
                    <div className="flex justify-center my-2">
                        <span className=''>Created by Partha</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword