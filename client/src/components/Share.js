import React, { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import VideoCallIcon from '@mui/icons-material/VideoCall';
// import MusicNoteIcon from '@mui/icons-material/MusicNote';
// import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import axios from 'axios';
import { useUserStore } from '../zustand';
import Close from '@mui/icons-material/Close';
import toast from 'react-hot-toast';



const Share = ({ setPosts, posts }) => {
    const currUser = useUserStore(s => s.user);
    const token = useUserStore(s => s.token);
    const [postDesc, setPostDesc] = useState("");
    const [postImg, setPostImg] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [sharing, setSharing] = useState(false);


    const handleShare = async (e) => {
        e.preventDefault();
        setSharing(true);
        try {
            if (!sharing && (postImg !== null || postDesc !== "")) {
                const formData = new FormData();
                formData.append("userId", currUser._id);
                formData.append("image", postImg);

                const res = await axios.post(`/posts`, {
                    userId: currUser?._id,
                    desc: postDesc,
                }, { headers: { "Authorization": `Bearer ${token}` } });
                // console.log(res.data);
                if (postImg) {
                    const res2 = await axios.put(`/posts/${res.data._id}/upload`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    // console.log(res2.data);
                    setPosts([res2.data, ...posts]);
                } else {
                    // toast.success("Posted successfully")
                    setPosts([res.data, ...posts]);
                }
                document.getElementById("text-area").value = "";
                document.getElementById("file-inp").value = null;
                setPostDesc("");
                setPostImg(null);
                setPreviewImg(null);
                toast.success("Posted successfully")
            }
        } catch (err) {
            console.log(err);
        }
        setSharing(false);
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
        setPreviewImg(cnvImg);
        setPostImg(e.target.files[0]);

    }
    const handleClose = () => {
        setPostImg(null);
        setPreviewImg(null);
        document.getElementById("file-inp").value = null;
    }
    return (
        <form className='border-2 rounded p-2 shadow-lg mb-2' onSubmit={handleShare}>
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
                previewImg &&
                <div className="w-full p-2 rounded relative">
                    <img
                        className='w-full aspect-auto rounded shadow-lg h-full'
                        src={previewImg || ""} alt="" />
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
                    className={`rounded px-4 p-2 bg-green-600 text-white font-bold 
                    ${sharing && "cursor-not-allowed"}`}>
                    {sharing ? "Sharing..." : "Share"}
                </button>
            </div>
        </form>
    )
}

export default Share