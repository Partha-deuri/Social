import React from 'react'
import { useUserStore } from '../zustand'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Settings = () => {
    const user = useUserStore(s => s.user);
    const setUser = useUserStore(s => s.setUser);
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    }

    const handleDeleteUser = () =>{
        // console.log("clicked")
        try{
            console.log(user._id)
            const res = axios.put(`/users/${user._id}/delete`,{userId:user._id})
            console.log(res.data);
            handleLogout();
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div
            className='w-[20vw] h-min absolute flex items-center justify-center -right-2 top-12 z-[10]'>
            <div className="bg-violet-500 w-full h-full p-2 rounded-lg z-8 flex flex-col gap-2">
                <div className=" p-2 rounded-lg bg-violet-700">
                    <div className="flex items-center gap-2 cursor-pointer ">
                        <img
                            className='h-10 w-10 rounded-full border-2'
                            src={user?.profilePic}
                            alt="" />
                        <span className="font-bold ">{user?.username}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">

                    <div className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer">
                        <span>Edit Profile</span>
                    </div>
                    <div className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer">
                        <span>Saved Posts</span>
                    </div>
                    <div className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer">
                        <span>Change Password</span>
                    </div>
                    <div
                        onClick={handleDeleteUser}
                        className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer">
                        <span>Delete Account</span>
                    </div>
                    <div className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer">
                        <span>Help & support</span>
                    </div>
                    <div className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer">
                        <span>About</span>
                    </div>
                </div>
                <div className="">
                    <button onClick={handleLogout}
                        className='text-center w-full bg-violet-800 rounded py-1 font-semibold text-white'
                    >Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Settings