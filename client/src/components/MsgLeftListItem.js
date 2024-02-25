import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MsgLeftListItem = ({ c, currUser }) => {
    const [friend, setFriend] = useState(null);

    useEffect(() => {
        const friendId = c.members.find(m => m !== currUser._id)
        try{
            const getFriend = async () =>{
                const res = await axios.get(`/users/${friendId}`);
                setFriend(res.data);
            } 
            getFriend();
        }catch(err){
            console.log(err)
        }
    }, [c, currUser])
    return (
        <div className=" flex items-center px-2 py-1 gap-2 border-b  rounded mx-1 cursor-pointer">
            <div className=" h-12 w-12 aspect-square ">
                <img
                    className='h-12 w-12 rounded-full  border-2'
                    src={friend?.profilePic || ""}
                    alt="" />
            </div>
            <span>{friend?.username || ""}</span>
        </div>
    )
}

export default MsgLeftListItem