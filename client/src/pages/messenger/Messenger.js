import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../zustand'
import axios from 'axios'
import MsgLeftListItem from '../../components/MsgLeftListItem'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { socket } from '../../App'
// import { io } from 'socket.io-client'

const Messenger = () => {
    const setUser = useUserStore(s => s.setUser);
    const user = useUserStore(s => s.user);
    const token = useUserStore(s => s.token);
    const [allConv, setAllConv] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [openChat, setOpenChat] = useState(false);
    const navigate = useNavigate();
    let { convid } = useParams();
    useEffect(() => {
        if (convid) {
            setOpenChat(true);
        } else {
            setOpenChat(false);
        }
    }, [convid])
    useEffect(() => {
        // socket= io(process.env.REACT_APP_SOCKET_URL);
        socket.emit("addUser", user._id);
        const fetchUser = async () => {
            const res = await axios.get(`/users/${user._id}`);
            setUser(res.data);
        }
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        try {
            const getFollowings = async () => {
                const res = await axios.get(`/users/${user._id}/followings`);
                setFriendList(res.data);
            }
            getFollowings();
        } catch (err) {
            console.log(err)
        }
        socket.emit("sendUsers");
        socket.on("getAllUsers", users => {
            setOnlineUsers(
                user.followings.filter(f => users.some(u => u.userId === f))
            );
            // console.log("user",users);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, user._id])
    // console.log(newMsgList);
    useEffect(() => {
        try {
            const fetchConv = async () => {
                const res = await axios.get(`/conv/${user?._id}`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                setAllConv(res.data);
            }
            fetchConv();
        } catch (err) {
            console.log(err)
        }
    }, [token, user])
    // console.log(allConv, "all");
    useEffect(() => {
        setOnlineFriends(friendList.filter(f => onlineUsers.includes(f._id)))
    }, [onlineUsers, friendList])
    const handleOnlineClick = async ({ fid }) => {
        try {
            const res = await axios.post('/conv', {
                senderId: user._id,
                receiverId: fid
            },
                { headers: { "Authorization": `Bearer ${token}` } })
            navigate(`/messenger/${res.data[0]._id}`);
            // setCurrChat(res.data[0]);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div>
            <div className="flex h-[calc(100dvh-56px)] ">
                <div className={`${openChat ? "hidden" : "block"} w-full md:block  md:w-1/5 p-2 h-full`}>
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
                                            className="relative h-12 w-12 aspect-square ">
                                            <img
                                                className='h-12 w-12 rounded-full cursor-pointer'
                                                src={f.profilePic || ""}
                                                alt="" />
                                            <span className='bg-lime-500 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px] '></span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <h1 className='font-bold bg-slate-300 rounded px-2 py-1 my-1 w-full'> Conversations </h1>
                        <div className="overflow-y-scroll h-[calc(100%-8.7rem)] w-full">
                            <hr className='border-t mt-1 mx-1 ' />
                            {
                                allConv.length !== 0 &&
                                allConv.map(c => (
                                    <div
                                        className="" key={c._id}
                                        onClick={() => {
                                            navigate(`/messenger/${c._id}`)
                                        }}
                                    >
                                        <MsgLeftListItem
                                            c={c}
                                            currUser={user}

                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`${openChat ? "block" : "hidden"} md:block md:w-4/5 w-full p-2 h-full`}>
                    <Outlet context={[socket]} />
                </div>
            </div>
        </div>
    )
}

export default Messenger