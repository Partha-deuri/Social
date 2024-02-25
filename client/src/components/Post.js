import React, { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import axios from "axios";
import { format } from 'timeago.js';
import { useUserStore } from '../zustand';
import CloseIcon from '@mui/icons-material/Close';

const Post = ({ post }) => {
    const user = useUserStore(state => state.user);
    const [postOwner, setPostOwner] = useState({});
    const [likes, setLikes] = useState(post?.likes?.length);
    const [moreOpt, setMoreOpt] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/${post.userId}`);
            setPostOwner(res.data)
        }
        fetchUser();
    }, [post.userId])


    const handleLike = async () => {
        const res = await axios.put(`/posts/${post._id}/like`, { userId: user._id })
        res.data === "liked successfully" ? setLikes(p => p + 1) : setLikes(p => p - 1)
    }

    const OptionsList = () => {
        return (
            <div className="absolute top-2 right-6 w-max h-max z-[1]">
                <div className="p-2 bg-violet-400 rounded flex flex-col gap-2 font-semibold">
                    <div className="px-2 py-1 bg-violet-500 rounded">
                        Edit Post
                    </div> 
                    <div className="px-2 py-1 bg-violet-500 rounded">
                        Delete
                    </div>
                    <div className="px-2 py-1 bg-violet-500 rounded">
                        Share
                    </div>
                    <div className="px-2 py-1 bg-violet-500 rounded">
                        Report
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='p-4 border-2 rounded shadow-lg mt-4'>
            <div className="">
                {/* top */}
                <div className="flex justify-between">
                    <Link to={`/profile/${postOwner._id}`} className="flex items-start gap-2 cursor-pointer">
                        <img
                            className='h-10 w-10 rounded-full border-2'
                            src={postOwner.profilePic}
                            alt="" />
                        <div className='flex flex-col gap-0'>
                            <span className="font-bold ">{postOwner.username}</span>
                            <span className='text-sm text-slate-400 cursor-default'>{format(post.createdAt)}</span>
                        </div>
                    </Link>
                    <div className="relative">
                        {
                            !moreOpt && <MoreHorizIcon 
                            onClick={()=>setMoreOpt(!moreOpt)}
                            className='cursor-pointer hover:text-red-200' />
                        }
                        {
                            moreOpt && <CloseIcon 
                            onClick={()=>setMoreOpt(!moreOpt)} 
                            className='cursor-pointer hover:text-red-200' />
                            
                        }
                        {
                            moreOpt && <OptionsList />
                        }
                    </div>
                </div>
                {/* image */}
                <div className="p-2">
                    <span>{post.desc}</span>
                    <img
                        className='w-full p-2 object-contain'
                        src={post.image}
                        alt="" />
                </div>
                {/* likes */}
                <div className=" flex gap-1">
                    <div
                        onClick={handleLike}
                        className="w-1/2 bg-red-300 h-8 text-white flex items-center justify-center rounded cursor-pointer">
                        <div className="flex gap-1 items-center" >
                            <FavoriteBorderIcon />
                            <span>{likes || 0} {(likes || 0) > 1 ? "Likes" : "Like"}</span>
                        </div>
                    </div>
                    <Link to={`/post/${post._id}`} className="w-1/2 bg-blue-300 h-8 text-white flex items-center justify-center rounded cursor-pointer">
                        <div className="flex gap-1 items-center">
                            <ChatBubbleOutlineIcon />
                            <span>{post.comments.length} {(post.comments.length) > 1 ? "Comments" : "Comment"}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Post