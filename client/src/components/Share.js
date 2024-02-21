import React, { useEffect, useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import useUserStore from '../zustand';
import axios from 'axios';


const Share = ({ setPosts, posts }) => {
    const userId = useUserStore(s => s.userId);
    const [currUser, setCurrUser] = useState(null);
    const [postDesc, setPostDesc] = useState("");
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`users/${userId}`)
            setCurrUser(res.data);
        }
        fetchUser();
    }, [userId])

    const handleShare = async () => {
        const res = await axios.post(`/posts`, { userId, desc: postDesc });
        setPosts([...posts, res.data]);
        document.getElementById("text-area").value="";
        setPostDesc("");
    }
    return (
        <div className='border-2 rounded p-2 shadow-lg mb-2'>
            <div className="flex gap-4 px-2">
                <img
                    className='h-12 w-12 border-2 rounded-full '
                    src={currUser?.profilePic || ""}
                    alt="" />
                <textarea
                    id="text-area"
                    onChange={(e) => setPostDesc(e.target.value)}
                    className=' p-2 rounded-sm w-11/12 min-h-16 max-h-60'
                    placeholder='Share your thoughts...'

                />
            </div>
            <hr className='my-2' />
            <div className="flex justify-between p-2 items-center">
                <div className="flex gap-4">
                    <div className="flex items-center cursor-pointer gap-1">
                        <AddPhotoAlternateIcon />
                        <span>Photo</span>
                    </div>
                    <div className="flex items-center cursor-pointer gap-1">
                        <VideoCallIcon />
                        <span>Video</span>
                    </div>
                    <div className="flex items-center cursor-pointer gap-1">
                        <MusicNoteIcon />
                        <span>Songs</span>
                    </div>
                    <div className="flex items-center cursor-pointer gap-1">
                        <AddLocationAltIcon />
                        <span>Location</span>
                    </div>
                </div>
                <button
                    onClick={handleShare}
                    className='rounded px-4 p-2 bg-green-600 text-white font-bold'>Share</button>
            </div>
        </div>
    )
}

export default Share