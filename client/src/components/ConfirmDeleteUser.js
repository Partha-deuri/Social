import React, { useState } from 'react'
import { useUserStore } from '../zustand';
import axios from 'axios';
import { socket } from '../App';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmDeleteUser = () => {
    const user = useUserStore(s => s.user);
    const token = useUserStore(s => s.token);
    const setUser = useUserStore(s => s.setUser);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await socket.emit("logout", user._id);
            await setUser(null);

            navigate('/login');
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }
    const handleSubmit = () => {
        setLoading(true);
        try {
            console.log(user._id)
            const res = axios.put(`/users/${user._id}/delete`, { userId: user._id }, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            console.log(res.data);
            handleLogout();
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
                    <Link
                        to={`/`}
                        className='absolute font-bold bg-red text-white rounded-full bg-red-500 h-8 w-8 flex justify-center items-center aspect-square -top-4 -right-4 cursor-pointer border border-black'>
                        X
                    </Link>
                    <div className="font-bold text-center mb-4 p-2 rounded bg-violet-600 text-white">
                        <span>Verify User</span>
                    </div>
                    <div className="">
                        <span className='text-sm'>Please verify yourself to delete your account</span>
                        <input
                            className='rounded px-2 py-1 my-2 w-full'
                            placeholder='Password'
                            type="password"
                            name="" id=""
                            required
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

export default ConfirmDeleteUser