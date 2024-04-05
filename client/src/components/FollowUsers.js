import React, { useEffect, useState } from 'react'

import ShareIcon from '@mui/icons-material/Share';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import axios from 'axios';
import { useUserStore } from '../zustand';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const FollowUsers = () => {
    const user = useUserStore(s => s.user);
    const [list, setList] = useState([]);

    useEffect(() => {
        const searchUsers = async () => {
            const res = await axios.get(`/users/search?q=.`)
            const unknowns = res.data.filter(u => !user.followings.includes(u._id) && u._id !== user._id)
            setList(unknowns);
        }
        searchUsers();
    }, [user._id, user.followings])

    const handleFollow = async ({ currProfile }) => {
        try {
            if (!user.followings.includes(currProfile?._id)) {
                await axios.post(`/users/${currProfile?._id}/follow`, { userId: user._id })
                user.followings.push(currProfile?._id);
                toast.success(`Followed ${currProfile.username} successfully`)
            } else {
                toast("You already follow  this  user");
            }
        } catch (err) {
            console.log(err)
        }

    }


    const handleCopy = async ({ uid }) => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/profile/${uid}`)
            console.log("copied")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="p-4 mt-4 mb-2 border rounded-md shadow-xl">
            <div className="p-2 mb-4 flex justify-center border bg-violet-300 font-semibold">
                <span className='text-xl'>Follow Users to see their Posts </span>
            </div>
            {
                list.length === 0 &&
                <div className="flex justify-center text-xl font-semibold text-gray-500">
                    <span>No users left to follow</span>
                </div>
            }
            {
                list.map((i) => (
                    <div key={i._id} className=" bg-violet-200 rounded-lg shadow-xl border mb-2">
                        <div className='flex  gap-2 items-center font-bold rounded border'>
                            <Link to={`/profile/${i._id}`} className=" w-1/5 flex justify-center">
                                <img
                                    className='h-20 rounded-full aspect-square p-2'
                                    src={i.profilePic || "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"} alt="" />
                            </Link>
                            <div className=" flex justify-between w-4/5 ">
                                <Link to={`/profile/${i._id}`} className="">
                                    {i.username}
                                </Link>
                                <div className="flex gap-4 items-center px-4 cursor-default">
                                    <div
                                        onClick={() => handleFollow({ currProfile: i })}
                                        className="hover:text-slate-400 cursor-pointer rounded-full">
                                        <PersonAddAlt1Icon />
                                    </div>
                                    <div
                                        onClick={() => handleCopy({ uid: i._id })}
                                        className="hover:text-slate-400 cursor-pointer rounded-full">
                                        <ShareIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export default FollowUsers