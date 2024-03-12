import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import MoreVert from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { useUserStore } from "../zustand";

const Comment = ({ c, p, setAllComments }) => {
    const user = useUserStore(s => s.user);
    const [commenter, setCommenter] = useState();
    const [mrOpt, setMrOpt] = useState(false);
    const [loading, setLoading] = useState(false);

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
            const res = axios.put(`/posts/${p?._id}/comment/${cmnt?._id}/delete`, {
                userId: user._id
            })
            console.log(res.data);
            setAllComments(prev => prev.filter(c => c?._id !== cmnt?._id));
        } catch (err) {
            console.log(err)
        }
        setLoading(false);
    }
    const handleEdit = () => {

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
                            Edit Comment
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
        <div className="px-1  mt-4 rounded flex items-start border shadow-md max-w-full">
            <Link to={`profile/${commenter?.__id}`} className=" mx-1 my-2 h-12 w-12 aspect-square">
                <img
                    className='h-12 w-12 aspect-square rounded-full'
                    src={commenter?.profilePic} alt="" />
            </Link>
            <div className="p-2 w-[calc(90%-3rem)]">
                <div className="flex gap-2 items-center">
                    <Link to={`/profile/${commenter?.__id}`} className='font-bold cursor-pointer'>{commenter?.username}</Link>
                    <span className='text-sm text-gray-400'>{format(c?.createdAt)}</span>
                </div>
                <div className="flex justify-between w-full">
                    <span className=" overflow-auto">
                        {c.comment}
                    </span>
                </div>
            </div>
            <div
                onClick={() => setMrOpt(!mrOpt)}
                className="py-2 px-1 flex items-center w-8 relative"
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
    )
}
export default Comment;