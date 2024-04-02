import React, { useState } from 'react'
import { useUserStore } from '../../zustand'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const user = useUserStore(s => s.user)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currPswd, setCurrPswd] = useState(null);
    const [newPswd, setNewPswd] = useState(null);
    const [cnfPswd, setCnfPswd] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (newPswd === cnfPswd) {
                const res = await axios.post('/auth/verify', { userId: user._id, password: currPswd })
                if (res.status === 200) {
                    const res2 = axios.put(`auth/change/${user.email}`, { password: newPswd })
                    console.log(res2.data);
                    navigate('/');
                } else {
                    console.log(res.data)
                }
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false);
    }
    return (
        <div className='absolute w-full h-[calc(100vh-60px)]  z-10 p-2'>
            <div className=" p-2 flex  justify-center items-center h-full ">
                <form
                    onSubmit={handleSubmit}
                    className="bg-violet-400 p-4 rounded-xl md:w-[30%] h-[50%] flex flex-col justify-between shadow-xl border relative z-40">
                    <div
                        onClick={()=>navigate('/')}
                        className='absolute font-bold bg-red text-white rounded-full bg-red-500 h-8 w-8 flex justify-center items-center aspect-square -top-4 -right-4 cursor-pointer border border-black'>
                        X
                    </div>
                    <div className="font-bold text-center mb-4 p-2 rounded bg-violet-600 text-white">
                        <span>Cahange Password</span>
                    </div>
                    <div className="">
                        <span className='text-sm'></span>
                        <input
                            className='rounded px-2 py-1 my-2 w-full'
                            placeholder='Current Password'
                            type="password"
                            required
                            onChange={(e) => setCurrPswd(e.target.value)}
                        />
                        <input
                            className='rounded px-2 py-1 my-2 w-full'
                            placeholder='New Password'
                            type="password"
                            required
                            onChange={(e) => setNewPswd(e.target.value)}
                        />
                        <input
                            className='rounded px-2 py-1 my-2 w-full'
                            placeholder='Confirm New Password'
                            type="password"
                            required
                            onChange={(e) => setCnfPswd(e.target.value)}
                        />
                    </div>
                    <button
                        className={`border-2 px-2 py-1 w-full rounded font-bold text-white               hover:bg-slate-300 ${loading && "cursor-not-allowed"} `}
                    >
                        {loading ? "Verifying..." : "Confirm"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword