import React, { useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { format } from 'timeago.js';
// import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Close from '@mui/icons-material/Close';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useUserStore } from '../zustand';
import { io } from 'socket.io-client';


const Conversation = () => {
    const currUser = useUserStore(s => s.user);
    const [messages, setMessages] = useState([]);
    const [friend, setFriend] = useState(null);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [newImg, setNewImg] = useState("");
    const [sending, setSending] = useState(false);
    const [arrivalMsg, setArrivalMsg] = useState([]);
    const [online, setOnline] = useState(false);
    const [currChat, setCurrChat] = useState({});
    let { convid } = useParams();
    const scrollRef = useRef();
    const navigate = useNavigate();
    // const socket = useRef();
    const [socket] = useOutletContext();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    useEffect(() => {
        // socket.current = io(process.env.REACT_APP_SOCKET_URL);
    }, [])
    useEffect(() => {
        socket.current?.emit("addUser", currUser._id);
    }, [currUser._id, socket])

    useEffect(() => {
        socket.current?.on("getMsg", data => {
            setArrivalMsg({
                _id: Date.now(),
                sender: data.senderId,
                text: data.text,
                image: data.image,
                createdAt: Date.now(),
            })
        })
        try {
            const fetchConv = async () => {
                const resC = await axios.get(`/conv/one/${convid}`);
                // console.log(resC.data);
                setCurrChat(resC.data);
            }
            fetchConv();
        } catch (err) {
            console.log(err)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        arrivalMsg && currChat?.members?.includes(arrivalMsg.sender) &&
            setMessages(prev => [...prev, arrivalMsg]);
    }, [arrivalMsg, currChat])

    useEffect(() => {
        const friendId = currChat?.members?.find(m => m !== currUser?._id)
        // setOnline(onlineUsers?.some(u => u.userId === friendId));
        socket.current.on("getAllUsers", users => {
            setOnline(users.some(u => u.userId === friendId));
            // setOnlineUsers(users);
        })
        try {
            const getFriend = async () => {
                const res = await axios.get(`/users/${friendId}`);
                setFriend(res.data);
            }
            if (friendId !== undefined)
                getFriend();
        } catch (err) {
            console.log(err)
        }
    }, [currChat?.members, currUser?._id, socket])
    useEffect(() => {
        try {
            const getMsgs = async () => {
                const res = await axios.get(`/msg/${currChat._id}`);
                setMessages(res.data);
            }
            if (currChat._id !== undefined)
                getMsgs();
        } catch (err) {
            console.log(err)
        }
    }, [currChat._id])

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
        setNewImg(cnvImg);
    }
    const handleNewMessage = async () => {
        try {
            if (newMsg.trim() !== "" || newImg !== "") {

                setSending(true);
                const res = await axios.post(`/msg`, {
                    sender: currUser?._id,
                    convId: currChat?._id,
                    text: newMsg,
                    image: newImg
                })
                socket.current?.emit("sendMsg", {
                    senderId: currUser._id,
                    receiverId: friend._id,
                    text: newMsg,
                    image: newImg,
                })
                setMessages([...messages, res.data])
                document.getElementById("msg-inp-text").value = "";
                document.getElementById("msg-inp-img").value = null;
                setNewImg("");
                setNewMsg("");
                setSending(false);
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleClose = () => {
        document.getElementById("msg-inp-img").value = null;
        setNewImg("");
    }

    const Msg = ({ own, m }) => {
        const [time, setTime] = useState("");
        const handleClick = () => {
            if (time === "") {
                setTime(format(m.createdAt));
            }
            else {
                setTime("");
            }
        }
        return (
            <div className="m-2">
                <div className={`flex ${own && "flex-row-reverse"} gap-2 items-start`}>
                    <div className=" h-8 w-8 aspect-square ">
                        <img
                            className='h-8 w-8 rounded-full  border-2'
                            src={own ? currUser?.profilePic : friend?.profilePic}
                            alt="" />
                    </div>
                    <div className="max-w-[70%] min-w-[60%] md:min-w-[30%] ">
                        <div onClick={handleClick} className={`${!own ? "bg-gray-300" : "bg-sky-300"} p-2 rounded-md shadow-lg flex flex-col items-end overflow-auto`}>
                            <span className='w-full'>
                                {m.text}
                            </span>
                            <div className="w-[100%]">
                                <img
                                    className=' object-contain  rounded-lg'
                                    src={m?.image} alt="" />
                            </div>
                        </div>
                        <div className='text-sm text-right px-2' >{time}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className=" shadow-xl h-full rounded-lg border-2  relative">
            <div className="rounded-md flex justify-between">
                <Link
                    to={`/profile/${friend?._id}`}
                    className=" flex items-center px-2 py-1 gap-2 rounded mx-1  cursor-pointer"
                >
                    <div className=" h-12 w-12 aspect-square ">
                        <img
                            className='h-12 w-12 rounded-full  border-2'
                            src={friend?.profilePic}
                            alt="" />
                    </div>
                    <div className="flex flex-col">
                        <span className='text-md font-bold'>{friend?.username}</span>
                        <span className='text-sm text-slate-500'>{online ? "Active" : "Offline"}</span>
                    </div>
                </Link>
                <div className="flex items-center mx-4 my-1 cursor-pointer gap-1">
                    {/* <MoreHoriz /> */}
                    <CloseIcon onClick={() => navigate('../')} />
                </div>
            </div>
            <hr className='border-b-1 border-slate-500' />
            <div className="h-[calc(100%-130px)] p-2 ">
                {
                    !messages &&
                    <div className='w-full flex justify-center items-center '>
                        <span className='font-bold'>
                            Loading...
                        </span>
                    </div>
                }
                {
                    messages?.length === 0 &&
                    <div className='w-full flex justify-center items-center overflow-hidden '>
                        <span>
                            {`Say Hello to ${friend?.username}`}
                        </span>
                    </div>
                }
                <div className="flex flex-col overflow-y-scroll h-full ">
                    {
                        messages?.map(m => (
                            <div key={m?._id} ref={scrollRef} className="">
                                <Msg m={m} own={m.sender === currUser?._id} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="w-full bottom-0 absolute p-2 ">
                <div className="w-[40%] aspect-auto p-2 rounded relative">
                    {
                        newImg && <>
                            <img src={newImg} alt="" className='rounded-xl' />
                            <div
                                onClick={handleClose}
                                className="absolute top-0 -right-1 cursor-pointer bg-slate-300 rounded-full"
                            >
                                <Close />
                            </div>
                        </>
                    }
                </div>
                <div className="flex gap-2 items-center px-2">
                    <label className='cursor-pointer bg-gray-200 aspect-square rounded-full p-2'>
                        <AddIcon />
                        <input
                            onChange={handleImgChange}
                            id="msg-inp-img"
                            className='hidden' type="file" accept="image/*" name="" />
                    </label>
                    <textarea
                        id="msg-inp-text"
                        onChange={(e) => setNewMsg(e.target.value)}
                        className='w-full border-2 rounded h-16 resize-none pl-1 border-black'
                    />
                    <button
                        onClick={handleNewMessage}
                        className={`bg-lime-500 p-2 rounded text-white font-bold ${sending && "cursor-not-allowed"}`}
                    >
                        {sending ? "Sending.." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Conversation