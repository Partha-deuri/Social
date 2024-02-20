import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

const Comment = ({ c }) => {
    const [commenter, setCommenter] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users/${c.userId}`);
            setCommenter(res.data)
        }
        fetchUser();
    }, [])
    return (
        <div className="px-1  mt-4 rounded flex items-start border shadow-md">
            <div className=" mx-1 my-2 h-12 w-12 aspect-square">
                <img
                    className='h-12 w-12 aspect-square rounded-full'
                    src={commenter?.profilePic} alt="" />
            </div>
            <div className="p-2">
                <div className="flex gap-2 items-center">
                    <span className='font-bold cursor-pointer'>{commenter?.username}</span>
                    <span className='text-sm text-gray-400'>{format(c?.createdAt)}</span>
                </div>
                <div className="">
                    <span>
                        {c.comment}
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Comment;