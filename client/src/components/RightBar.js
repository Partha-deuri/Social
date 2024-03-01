import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import Ads from './Ads';
import { Link } from 'react-router-dom';

const RightBar = () => {
    return (
        <div className='w-1/4 p-2  overflow-y-scroll hidden lg:block'>
            {/* online friends */}
            <div className="">
                <h1 className='font-bold bg-slate-300 rounded p-2 mb-2'>Online Friends</h1>
                <div className="border-2 rounded-lg border-slate-300 shadow-md" >
                    <ul className='p-2 '>
                        <Link to={`/profile/`} className='flex justify-between items-center mb-3'>
                            <div className="flex gap-3 items-center cursor-pointer">
                                <div className="flex relative">
                                    <img
                                        className='h-8 w-8 rounded-full'
                                        src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                        alt="" />
                                    <span className='bg-green-400 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                                </div>
                                <span className="">Partha</span>
                            </div>
                            <div className="pr-2 cursor-pointer hover:text-slate-400">
                                <ChatIcon />
                            </div>
                        </Link>
                    </ul>
                </div>
            <div className="">
            </div >
                <Ads/>
            </div>
        </div>
    )
}

export default RightBar