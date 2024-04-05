import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import MoreVert from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { useUserStore } from "../zustand";
import toast from "react-hot-toast";

const Comment = ({ c, p, setAllComments }) => {
    const user = useUserStore(s => s.user);
    const [commenter, setCommenter] = useState();
    const [mrOpt, setMrOpt] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const cmtEdit = useRef();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/${c.userId}`);
            setCommenter(res.data)
        }
        fetchUser();
    }, [c])

    const handleDelete = async (cmnt) => {
        setLoading(true);
        try {
            await axios.put(`/posts/${p?._id}/comment/${cmnt?._id}/delete`, {
                userId: user._id
            })
            // console.log(res.data);
            setAllComments(prev => prev.filter(c => c?._id !== cmnt?._id));
        } catch (err) {
            console.log(err)
        }
        setLoading(false);
    }
    const handleEdit = () => {
        setEditing(prev => !prev);
    }
    const handleSaveEdit = async () => {
        // console.log("Saving")
        const newCmnt = cmtEdit.current.value;
        setLoading(true);
        try {
            if (newCmnt !== document.getElementById(`comment-text-${c._id}`).innerText) {
                const res = await axios.put(`/posts/${p?._id}/comment/${c?._id}`,
                    { userId: user._id, comment: newCmnt })
                c.updatedAt = Date.now();
                toast.success(res.data);
                document.getElementById(`comment-text-${c._id}`).innerText = newCmnt;
            }
        } catch (err) {
            toast.error(err.response.data);
        }
        setLoading(false);
        setEditing(false);
    }

    const MoreOpt = ({ cmnt, cmtr }) => {
        return (
            <div className="absolute w-max right-8 top-1">
                <div className="p-2 bg-violet-400 rounded-md font-semibold  flex flex-col gap-1">
                    {
                        cmtr?._id === user?._id &&
                        <div
                            onClick={handleEdit}
                            className=" bg-violet-500 px-2 py-1 rounded cursor-pointer">
                            {editing ? "Cancel Edit" : "Edit Comment"}
                        </div>
                    }
                    {
                        (user?._id === p.userId || user?._id === cmtr?._id) &&
                        <div
                            onClick={() => handleDelete(cmnt)}
                            className=" bg-violet-500 px-2 py-1 rounded cursor-pointer">
                            {loading ? "Deleting" : "Delete Comment"}
                        </div>
                    }
                    {
                        cmtr?._id !== user?._id &&
                        <div className=" bg-violet-500 px-2 py-1 rounded cursor-pointer">
                            Report
                        </div>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="px-1  mt-4 rounded  border shadow-md max-w-full">
            <div className="flex justify-between">
                <div className="flex">
                    <Link to={`profile/${commenter?._id}`} className=" mx-1 my-2 h-12 w-12 aspect-square">
                        <img
                            className='h-12 w-12 aspect-square rounded-full'
                            src={commenter?.profilePic} alt="" />
                    </Link>
                    <div className="p-2 ">
                        <div className="flex gap-2 items-center">
                            <Link to={`/profile/${commenter?._id}`} className='font-bold cursor-pointer'>{commenter?.username || "Loading..."}</Link>
                            <span className='text-sm text-gray-400'>{format(c?.createdAt)}</span>
                            <span className='text-sm text-gray-400'>{c.createdAt !== c.updatedAt ? "(edited)" : ""}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span id={`comment-text-${c._id}`} className=" overflow-auto">
                                {c.comment}
                            </span>
                        </div>

                    </div>
                </div>
                <div
                    onClick={() => setMrOpt(!mrOpt)}
                    className="py-2 px-1 flex items-center w-8 relative z-0"
                >
                    {
                        mrOpt && <CloseIcon onClick={() => setMrOpt(false)} className="cursor-pointer" />
                    }
                    {
                        !mrOpt && <MoreVert onClick={() => setMrOpt(true)} className="cursor-pointer" />
                    }
                    {
                        mrOpt && <MoreOpt cmnt={c} cmtr={commenter} />
                    }
                </div>
            </div>
            <div className={`${editing ? "flex" : "hidden"} mb-2 justify-between px-2 gap-2 `}>
                <input
                    id={`inp-desc-${c._id}`}
                    type='text'
                    defaultValue={c.comment}
                    placeholder='Edit your text here'
                    className={`w-11/12 p-2 ${!editing && "hidden"} border`}
                    ref={cmtEdit}
                />
                <button
                    onClick={handleSaveEdit}
                    className={`flex items-center justify-center w-1/12 rounded-md bg-lime-500 text-white font-bold ${!editing && "hidden"}`}
                >
                    <span>{loading ? "Saving" : "Save"}</span>
                </button>
            </div>

        </div>
    )
}
export default Comment;