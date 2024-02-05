import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const Post = () => {
    return (
        <div className='p-4 border-2 rounded shadow-lg mt-4'>
            <div className="">
                {/* top */}
                <div className="flex justify-between">
                    <div className="flex items-start gap-2 cursor-pointer">
                        <img
                            className='h-10 w-10 rounded-full border-2'
                            src="https://avatars.githubusercontent.com/u/130203363?v=4"
                            alt="" />
                        <div className='flex flex-col gap-0'>
                            <span className="font-bold ">Partha</span>
                            <span className='text-sm text-slate-400 cursor-default'>3 minutes ago</span>
                        </div>
                    </div>
                    <div className="">
                        <MoreHorizIcon className='cursor-pointer' />
                    </div>
                </div>
                {/* image */}
                <div className="p-2">
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit molestiae neque molestias! Quia harum enim nostrum laudantium fuga culpa suscipit maxime veniam earum facilis rerum, accusantium recusandae fugiat, debitis necessitatibus.</span>
                    <img
                        className='w-full p-2'
                        src="https://avatars.githubusercontent.com/u/130203363?v=4"
                        alt="" />
                </div>
                {/* likes */}
                <div className=" flex gap-1">
                    <div className="w-1/2 bg-red-300 h-8 text-white flex items-center justify-center rounded ">
                        <label className='cursor-pointer'>
                            <FavoriteBorderIcon />
                            <span>&nbsp;Like</span>
                        </label>
                    </div>
                    <div className="w-1/2 bg-blue-300 h-8 text-white flex items-center justify-center rounded">
                        <label className='cursor-pointer'>
                        <ChatBubbleOutlineIcon />
                        <span>&nbsp;Comment</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post