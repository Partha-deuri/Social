import React from 'react'
import { useUserStore } from '../zustand'
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';

const Settings = ({ socket, setSettings }) => {
    const user = useUserStore(s => s.user);
    const setUser = useUserStore(s => s.setUser);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await socket.emit("logout", user._id);
            await setUser(null);
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div 
            onClick={() => setSettings(false)}
            className='w-[250px] h-min absolute flex items-center justify-center -right-2 top-12 z-50 min-w-fit'>
            <div className="bg-violet-500 w-full h-full p-2 rounded-lg z-8 flex flex-col gap-2">
                <Link to={`/profile/${user._id}`} className=" p-2 rounded-lg bg-violet-700">
                    <div className="flex items-center gap-2 cursor-pointer ">
                        <img
                            className='h-10 w-10 rounded-full border-2'
                            src={user?.profilePic}
                            alt="" />
                        <span className="font-bold ">{user?.username}</span>
                    </div>
                </Link>
                <div className="flex flex-col gap-2">

                    <Link to={'/editprofile'} className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer flex gap-2 hover:text-white items-center">
                        <EditIcon />
                        <span>Edit Profile</span>
                    </Link>
                    <Link to={'/messenger'} className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer md:hidden flex gap-2 hover:text-white items-center">
                        <ChatIcon />
                        <span>Messenger</span>
                    </Link>
                    <div className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer
                    flex gap-2 hover:text-white items-center"
                        onClick={() => navigate('/change-password')}
                    >
                        <PasswordIcon />
                        <span>Change Password</span>
                    </div>
                    <Link
                        to={`/confirm-delete`}
                        className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer
                        flex gap-2 hover:text-white items-center">
                        <DeleteForeverIcon />
                        <span>Delete Account</span>
                    </Link>
                    <div className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer
                    flex gap-2 hover:text-white items-center">
                        <HelpIcon />
                        <span>Help & support</span>
                    </div>
                    <Link to={"/about"} className="rounded bg-violet-300 p-2 font-semibold text-slate-700 cursor-pointer flex gap-2 hover:text-white items-center">
                        <InfoIcon />
                        <span>About</span>
                    </Link>
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