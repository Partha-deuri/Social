import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [otpConfirm, setOtpConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpId, setOtpId] = useState(null);
    const [email, setEmail] = useState(null);
    const emailRef = useRef();
    const otp = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();


    const sendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setEmail(emailRef.current.value);
            const res = await axios.get(`/auth/forgot/${emailRef.current.value.trim()}`);
            if (res.data?.msg === "all ok") {
                setOtpId(res.data.otpId);
            } else {
                console.log(res.data.msg)
            }
            setOtpSent(true);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }
    const confirmOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // verify otp 
            if (otp.current.value.length === 6) {
                const res = await axios.post(`/auth/otp`, {
                    otpId,
                    otp: otp.current.value,
                    email
                })
                if (res.data.msg === "success") {
                    setOtpConfirm(true);
                }
            } else {
                console.log("otp should be of exactly 6-digit")
            }
        } catch (err) {
            if (err.response.status === 403) {
                console.log("otp  mismatch");
            } else {
                console.log(err)
            }
        }
        setLoading(false);
    }
    const handleWrongEmail = () => {
        setEmail("");
        setOtpSent(false);
        setOtpConfirm(false);
    }
    const handleResendOtp = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/auth/email/${email}`);
            if (res.data?.msg === "all ok") {
                setOtpId(res.data.otpId);
            } else {
                console.log(res.data.msg)
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false);
    }
    const InputArea = () => {
        return (
            <div className="p-4 ">
                <input type="text"
                    className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
                    placeholder='Enter your email'
                    ref={emailRef}
                />
                <button
                    onClick={(e) => sendOtp(e)}
                    className={`text-2xl font-semibold text-center w-full bg-violet-700 rounded p-2 mt-4 text-white hover:bg-violet-500 ${loading && "cursor-not-allowed"}`}
                >
                    {
                        loading ? "Sending OTP..." : "Send OTP"
                    }
                </button>
            </div>
        )
    }

    const OtpArea = () => {
        return (
            <div className="p-4 ">
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
                <input type="text"
                    className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
                    placeholder='Enter OTP'
                    ref={otp}
                />
                <button
                    onClick={(e) => confirmOtp(e)}
                    className={`text-2xl font-semibold text-center w-full bg-violet-700 rounded p-2 mt-4 text-white hover:bg-violet-500 ${loading && "cursor-not-allowed"}`}
                >
                    {
                        loading ? "Vrifying..." : "Confirm OTP"
                    }
                </button>
            </div>
        )
    }

    const handlePasswordReset = async () => {
        try {
            const pswd = password.current.value;
            const cnfpswd = confirmPassword.current.value;
            if (pswd === cnfpswd) {
                await axios.put(`/auth/change/${email}`, {
                    password: pswd
                })
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
        }
    }
    const PasswordArea = () => {
        return (
            <div className="p-4 ">
                <span className='font-semibold text-lg text-white'>Enter new Password</span>
                <input type="text"
                    className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
                    placeholder='New Password'
                    ref={password}
                />
                <input type="text"
                    className='my-2 border border-black w-full text-xl p-2 rounded bg-transparent'
                    placeholder='Confirm New Password'
                    ref={confirmPassword}
                />
                <button
                    className={`${loading && "cursor-not-allowed"} text-2xl font-semibold text-center w-full bg-violet-700 rounded p-2 mt-4 text-white hover:bg-violet-500 `}
                    onClick={handlePasswordReset}
                >
                    {loading ? "Loading..." : "Confirm"}
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