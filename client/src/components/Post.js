import React, { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import axios from "axios";
import { format } from 'timeago.js';
import { useUserStore } from '../zustand';

const Post = ({ post }) => {
    const user = useUserStore(state => state.user);
    const [postOwner, setPostOwner] = useState({});
    const [likes, setLikes] = useState(post.likes.length);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/${post.userId}`);
            setPostOwner(res.data)
        }
        fetchUser();
    }, [])


    const handleLike = async () => {
        const res = await axios.put(`/posts/${post._id}/like`, { userId: user._id })
        res.data === "liked successfully" ? setLikes(p => p + 1) : setLikes(p => p - 1)
    }
    return (
        <div className='p-4 border-2 rounded shadow-lg mt-4'>
            <div className="">
                {/* top */}
                <div className="flex justify-between">
                    <div className="flex items-start gap-2 cursor-pointer">
                        <img
                            className='h-10 w-10 rounded-full border-2'
                            src={postOwner.profilePic}
                            alt="" />
                        <div className='flex flex-col gap-0'>
                            <span className="font-bold ">{postOwner.username}</span>
                            <span className='text-sm text-slate-400 cursor-default'>{format(post.createdAt)}</span>
                        </div>
                    </div>
                    <div className="">
                        <MoreHorizIcon className='cursor-pointer hover:text-red-200' />
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