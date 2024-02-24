import React, { useEffect, useState } from 'react'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import { useUserStore } from '../zustand';
import axios from 'axios';
import ExploreIcon from '@mui/icons-material/Explore';

const LeftBar = () => {
    const user = useUserStore(s => s.user);
    const friendList = user?.followings || [];

    const FriendItem = ({ fid }) => {
        const [friend, setFriend] = useState(null);
        useEffect(() => {
            try {
                const fetchFriend = async () => {
                    const res = await axios.get(`/users/${fid}`)
                    setFriend(res.data);
                }
                fetchFriend();
            } catch (err) {
                console.log(err);
            }
        }, [])
        return (
            <div className='pl-4 flex items-center gap-2 my-2 pb-1'>
                <img
                    className='h-8 w-8 rounded-full'
                    src={friend?.profilePic}
                    alt="" />
                <span className="">{friend?.username || "Loading..."}</span>
            </div>
        )
    }
    return (
        <div className='w-1/5 p-2 overflow-y-scroll' >
            <div className="">
                <ul className='flex flex-col gap-4 pl-2 py-2 '>
                    <li className='flex items-center gap-2'>
                        <RssFeedIcon />
                        <span className="">Feed</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <ChatIcon />
                        <span className=''>Chat</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <PlayCircleIcon />
                        <span className="">Videos</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <GroupsIcon />
                        <span className="">Groups</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <EventIcon />
                        <span className="">Events</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <EventIcon />
                        <span className="">Events</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <EventIcon />
                        <span className="">Events</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <ExploreIcon />
                        <span className="">Explore</span>
                    </li>
                </ul>
                <button className='text-center w-full rounded mb-1 bg-slate-200 font-medium py-1'>Show More</button>
                <hr className='my-1 bg-slate-700 p-[1px] ' />
                <div className=' mt-2'>
                    <h1 className='font-bold bg-slate-300 rounded p-2 mb-2 sticky top-[-8px] z-10'>Friends</h1>
                    <div className='border-2 border-slate-300 rounded-lg'>
                        {
                            friendList.map(fid => (
                                <FriendItem key={fid} fid={fid} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar