import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserStore } from '../zustand';


const RightBar = ({ onlineUsers, user }) => {
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const navigate = useNavigate();
    const token = useUserStore(s => s.token);
    useEffect(() => {
        try {
            const getFollowings = async () => {
                const res = await axios.get(`/users/${user?._id}/followings`);
                setFriendList(res.data);
            }
            getFollowings();
        } catch (err) {
            console.log(err)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        setOnlineFriends(friendList.filter(f => onlineUsers.includes(f?._id)))
    }, [friendList, onlineUsers])

    const handleMsg = async ({ uid }) => {
        try {
            const res = await axios.post(`/conv`, {
                senderId: user._id,
                receiverId: uid
            },
                {
                    headers: { "Authorization": `Bearer ${token}` }
                })
            navigate(`/messenger/${res.data[0]._id}`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='w-1/4 p-2  overflow-y-scroll hidden lg:block'>
            {/* online friends */}
            <div className="">
                <h1 className='font-bold bg-slate-300 rounded p-2 mb-2'>Online Friends</h1>
                <div className="border-2 rounded-lg border-slate-300 shadow-md" >
                    <ul className='p-2 '>
                        {
                            onlineFriends.length === 0 &&
                            <div className="flex text-sm font-bold justify-center text-gray-400">
                                <span>No one is online</span>
                            </div>
                        }
                        {
                            onlineFriends.map(i => (
                                <div key={i._id} className='flex justify-between items-center mb-3'>
                                    <Link to={`/profile/${i._id}`} className="flex gap-3 items-center cursor-pointer">
                                        <div className="flex relative">
                                            <img
                                                className='h-8 w-8 rounded-full'
                                                src={i.profilePic}
                                                alt="" />
                                            <span className='bg-green-400 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                                        </div>
                                        <span className="">{i.fullname || "Loading..."}</span>
                                    </Link>
                                    <div
                                        onClick={() => handleMsg({ uid: i._id })}
                                        className="pr-2 cursor-pointer hover:text-slate-400"
                                    >
                                        <ChatIcon />
                                    </div>
                                </div>
                            ))
                        }
                    </ul>
                </div>
                <div className="">
                </div >
                {/* <Ads/> */}
            </div>
        </div>
    )
}

export default RightBar