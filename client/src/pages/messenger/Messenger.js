import React, { useEffect, useRef, useState } from 'react'
import TopBar from '../../components/TopBar'
import Conversation from '../../components/Conversation'
import { useUserStore } from '../../zustand'
import axios from 'axios'
import MsgLeftListItem from '../../components/MsgLeftListItem'
import { io } from "socket.io-client";

const Messenger = () => {
    const user = useUserStore(s => s.user);
    const [allConv, setAllConv] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [currChat, setCurrChat] = useState(null);
    const socket = useRef()
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        try {
            const getFollowings = async () => {
                const res = await axios.get(`/users/${user._id}/followings`);
                setFriendList(res.data);
            }
            getFollowings();
        } catch (err) {
            console.log(err)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        try {
            const fetchConv = async () => {
                const res = await axios.get(`/conv/${user?._id}`)
                setAllConv(res.data);
            }
            fetchConv();
        } catch (err) {
            console.log(err)
        }
        socket.current.emit("addUser", user._id);
        socket.current.on("getAllUsers", users => {
            setOnlineUsers(
                user.followings.filter(f => users.some(u => u.userId === f))
            );
        });
    }, [user])
    useEffect(() => {
        setOnlineFriends(friendList.filter(f => onlineUsers.includes(f._id)))
    }, [onlineUsers, friendList])

    const handleOnlineClick = async ({ fid }) => {
        try {
            const res = await axios.post('/conv', {
                senderId: user._id,
                receiverId: fid
            })
            setCurrChat(res.data[0]);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div>
            <TopBar />
            <div className="flex h-[calc(100vh-56px)]">
                <div className={`${!currChat ? "block" : "hidden"} md:block  md:w-1/5 w-full p-2 h-full`}>
                    <div className="shadow-lg border h-full rounded-lg">
                        <div className="">
                            <h1 className='font-bold bg-slate-300 rounded px-2 py-1 '> Online</h1>
                            <div className="flex online gap-2 p-2 overflow-x-scroll">
                                {
                                    onlineFriends.length === 0 &&
                                    <div
                                        className="px-2 pt-1 w-full text-xl font-semibold flex justify-center text-slate-500"
                                    >
                                        <span>No one is online</span>
                                    </div>
                                }
                                {
                                    onlineFriends.map(f => (
                                        <div
                                            onClick={() => handleOnlineClick({ fid: f._id })}
                                            key={f._id}
                                            className="relative h-12 w-12 aspect-square">
                                            <img
                                                className='h-12 w-12 rounded-full'
                                                src={f.profilePic || ""}
                                                alt="" />
                                            <span className='bg-lime-500 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <h1 className='font-bold bg-slate-300 rounded px-2 py-1 my-1 w-full'> Conversations </h1>
                        <div className="overflow-y-scroll h-[calc(100%-8.7rem)] w-full">
                            <hr className='border-t mt-1 mx-1 ' />
                            {
                                allConv.map(c => (
                                    <div className="" key={c._id} onClick={() => setCurrChat(c)}>
                                        <MsgLeftListItem
                                            c={c}
                                            currUser={user}
                                            socket={socket.current}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`${currChat ? "block" : "hidden"} md:block md:w-4/5 w-full p-2`}>
                    {
                        currChat ?
                            <Conversation
                                currChat={currChat}
                                currUser={user}
                                socket={socket.current}
                                onlineUsers={onlineUsers}
                                setCurrChat={setCurrChat}
                            /> :
                            <div className="border-2 shadow h-full w-full rounded-lg flex items-center justify-center">
                                <div className="text-3xl font-bold text-slate-400 cursor-default">
                                    <span>Open a Conversation to start Chat</span>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Messenger