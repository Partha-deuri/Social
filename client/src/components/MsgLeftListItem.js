import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const MsgLeftListItem = ({ c, currUser, newMsgList, setNewMsgList }) => {
    const [friend, setFriend] = useState(null);
    const [newMsg, setNewMsg] = useState(false);
    let { convid } = useParams();
    useEffect(() => {
        const friendId = c.members.find(m => m !== currUser._id)
        convid && convid === c._id &&
            setNewMsgList(prev => prev.filter(u => u !== friendId)) &&
            setNewMsg(false);
        newMsgList?.includes(friendId) && setNewMsg(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [convid]);

    useEffect(() => {
        const friendId = c.members.find(m => m !== currUser._id)

        try {
            const getFriend = async () => {
                const res = await axios.get(`/users/${friendId}`);
                setFriend(res.data);
                // console.log(res.data);
            }
            getFriend();
        } catch (err) {
            console.log(err)
        }
    }, [c._id, c.members, convid, currUser._id])
    return (
        <>
            {
                friend?.username &&

                <div className="flex items-center px-2 py-1 gap-2 border-b  rounded mx-1 cursor-pointer" >
                    <div className=" h-12 w-12 aspect-square ">
                        <img
                            className='h-12 w-12 rounded-full  border-2'
                            src={friend?.profilePic || ""}
                            alt="" />
                    </div>
                    <span>{friend?.username || ""}</span>
                    {
                        newMsg &&
                        <div className='m-2 rounded-full bg-red-700 p-2'>
                        </div>
                    }
                </div >
            }
        </>
    )
}

export default MsgLeftListItem