import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import MoreVert from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

const Comment = ({ c }) => {
    const [commenter, setCommenter] = useState();
    const [mrOpt, setMrOpt] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/${c.userId}`);
            setCommenter(res.data)
        }
        fetchUser();
    }, [c])

    const MoreOpt = ({ cmnt, cmtr }) => {
        return (
            <div className="absolute w-max right-8 top-1">
                <div className="p-2 bg-violet-400 rounded-md font-semibold  flex flex-col gap-1">
                    <div className=" bg-violet-500 px-2 py-1 rounded">
                        Edit Comment
                    </div>
                    <div className=" bg-violet-500 px-2 py-1 rounded">
                        Delete Commennt
                    </div>
                    <div className=" bg-violet-500 px-2 py-1 rounded">
                        Report
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="px-1  mt-4 rounded flex items-start border shadow-md">
            <Link to={`profile/${commenter?._id}`} className=" mx-1 my-2 h-12 w-12 aspect-square">
                <img
                    className='h-12 w-12 aspect-square rounded-full'
                    src={commenter?.profilePic} alt="" />
            </Link>
            <div className="p-2 w-full ">
                <div className="flex gap-2 items-center">
                    <Link to={`/profile/${commenter?._id}`} className='font-bold cursor-pointer'>{commenter?.username}</Link>
                    <span className='text-sm text-gray-400'>{format(c?.createdAt)}</span>
                </div>
                <div className="flex justify-between w-full">
                    <span>
                        {c.comment}
                    </span>
                </div>
            </div>
            <div
                onClick={() => setMrOpt(!mrOpt)}
                className="py-2 px-1 flex items-center  relative"
            >
                {
                    mrOpt && <CloseIcon  className="cursor-pointer" />
                }
                {
                    !mrOpt && <MoreVert  className="cursor-pointer"/>
                }
                {
                    mrOpt && <MoreOpt cmnt={c} cmtr={commenter} />
                }
            </div>
        </div>
    )
}
export default Comment;