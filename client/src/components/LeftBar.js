import React, { useEffect, useState } from 'react'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import { useUserStore } from '../zustand';
import axios from 'axios';
import ExploreIcon from '@mui/icons-material/Explore';
import { Link } from 'react-router-dom';

const LeftBar = () => {
    const user = useUserStore(s => s.user);
    const [friendList, setFriendList] = useState([]);
    useEffect(() => {
        try {
            const fetchFriend = async () => {
                const res = await axios.get(`/users/${user?._id}/followings`);
                setFriendList(res.data);
            }
            fetchFriend();
        } catch (err) {
            console.log(err)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const FriendItem = ({ f }) => {
        return (
            <Link to={`/profile/${f?._id}`} className='pl-4 flex items-center gap-2 my-2 pb-1'>
                <img
                    className='h-8 w-8 rounded-full'
                    src={f?.profilePic}
                    alt="" />
                <span className="">{f?.username || "Loading..."}</span>
            </Link>
        )
    }
    return (
        <div className='w-2/5 p-2 overflow-y-scroll hidden md:block lg:w-1/5' >
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
                    <h1 className='font-bold bg-slate-300 rounded p-2 mb-2 sticky top-[-8px] z-6'>Friends</h1>
                    <div className='border-2 border-slate-300 rounded-lg'>
                        {
                            friendList.map(f => (
                                <FriendItem key={f?._id} f={f} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar