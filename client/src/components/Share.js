import React, { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import axios from 'axios';
import { useUserStore } from '../zustand';
import Close from '@mui/icons-material/Close';


const Share = ({ setPosts, posts }) => {
    const currUser = useUserStore(s => s.user);
    const [postDesc, setPostDesc] = useState("");
    const [postImg, setPostImg] = useState(null);
    // console.log(postImg);
    const [sharing, setSharing] = useState(false);


    const handleShare = async () => {
        try {
            if (!sharing && (postImg !== null || postDesc !== "")) {
                setSharing(true);
                const res = await axios.post(`/posts`, {
                    userId: currUser?._id,
                    desc: postDesc,
                    image: postImg,
                });
                setPosts([res.data, ...posts]);
                document.getElementById("text-area").value = "";
                document.getElementById("file-inp").value = null;
                setPostDesc("");
                setPostImg(null);
                setSharing(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const base64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    const handleImgChange = async (e) => {
        const cnvImg = await base64(e.target.files[0]);
        setPostImg(cnvImg);
    }
    const handleClose = () => {
        setPostImg(null);
        document.getElementById("file-inp").value = null;
    }
    return (
        <div className='border-2 rounded p-2 shadow-lg mb-2'>
            <div className="flex gap-4 px-2">
                <img
                    className='h-12 w-12 border-2 rounded-full '
                    src={currUser?.profilePic || "https://i.pinimg.com/236x/9a/e8/fc/9ae8fc22197c56c5e5b0c2c22b05186e.jpg"}
                    alt="" />
                <textarea
                    id="text-area"
                    onChange={(e) => setPostDesc(e.target.value)}
                    className=' p-2 rounded-sm w-11/12 min-h-16 max-h-60'
                    placeholder='Share your thoughts...'

                />
            </div>
            <hr className='my-2' />
            {
                postImg &&
                <div className="w-full p-2 rounded relative">
                    <img
                        className='w-full aspect-auto rounded shadow-lg h-full'
                        src={postImg || ""} alt="" />
                    <Close
                        fontSize="large"
                        onClick={handleClose}
                        className='absolute right-0 top-0 bg-violet-300 rounded-full p-1 hover:text-white cursor-pointer' />
                </div>
            }
            <div className="flex justify-between p-2 items-center">
                <div className="flex gap-4 flex-wrap">
                    <label htmlFor='file-inp' className="flex items-center cursor-pointer gap-1">
                        <AddPhotoAlternateIcon />
                        <span>Photo</span>
                        <input
                            onChange={(e) => handleImgChange(e)}
                            type="file"
                            className="hidden"
                            id="file-inp"
                            accept='image/*' />
                    </label>
                    {/* <div className="flex items-center cursor-pointer gap-1">
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
                    </div> */}
                </div>
                <button
                    onClick={handleShare}
                    className={`rounded px-4 p-2 bg-green-600 text-white font-bold 
                    ${sharing && "cursor-not-allowed"}`}>
                    {sharing ? "Sharing..." : "Share"}
                </button>
            </div>
        </div>
    )
}

export default Share