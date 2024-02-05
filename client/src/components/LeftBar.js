import React from 'react'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';

const LeftBar = () => {
    return (
        <div className='w-1/5 p-2 overflow-y-scroll' >
            <div className="border-2 border-slate-300 rounded-lg">
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
                        <EventIcon />
                        <span className="">Events</span>
                    </li>
                </ul>
                <button className='text-center w-full rounded mb-1 bg-slate-200 font-medium'>Show More</button>
                <hr className='my-1 bg-slate-700 p-[1px] ' />
                <div className=''>
                    <h1 className='font-bold bg-slate-300 rounded p-2 my-2 sticky top-[-8px] z-10'>Friends</h1>
                    <ul>
                        <li className='pl-4 flex items-center gap-2 my-2 pb-1 border-b'>
                            <img
                                className='h-8 w-8 rounded-full'
                                src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                alt="" />
                            <span className="">Partha</span>
                        </li>
                        <li className='pl-4 flex items-center gap-2 my-2 pb-1 border-b'>
                            <img
                                className='h-8 w-8 rounded-full'
                                src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                alt="" />
                            <span className="">Partha</span>
                        </li>
                        <li className='pl-4 flex items-center gap-2 my-2 pb-1 border-b'>
                            <img
                                className='h-8 w-8 rounded-full'
                                src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                alt="" />
                            <span className="">Partha</span>
                        </li>
                        <li className='pl-4 flex items-center gap-2 my-2 pb-1 border-b'>
                            <img
                                className='h-8 w-8 rounded-full'
                                src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                alt="" />
                            <span className="">Partha</span>
                        </li>
                        <li className='pl-4 flex items-center gap-2 my-2 pb-1 border-b'>
                            <img
                                className='h-8 w-8 rounded-full'
                                src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                alt="" />
                            <span className="">Partha</span>
                        </li>
                        <li className='pl-4 flex items-center gap-2 my-2 pb-1 border-b'>
                            <img
                                className='h-8 w-8 rounded-full'
                                src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                alt="" />
                            <span className="">Partha</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LeftBar