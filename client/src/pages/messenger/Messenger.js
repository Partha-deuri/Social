import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import Conversation from '../../components/Conversation'
import { useUserStore } from '../../zustand'
import axios from 'axios'
import MsgLeftListItem from '../../components/MsgLeftListItem'

const Messenger = () => {
    const user = useUserStore(s => s.user);
    const [allConv, setAllConv] = useState([]);
    const [currChat, setCurrChat] = useState(null);
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
    }, [user])
    return (
        <div>
            <TopBar />
            <div className="flex h-[calc(100vh-56px)]">
                <div className="w-1/5 p-2 h-full">
                    <div className="shadow-lg border h-full rounded-lg">
                        <div className="">
                            <h1 className='font-bold bg-slate-300 rounded px-2 py-1 '> Online</h1>
                            <div className="flex online gap-2 p-2 overflow-x-scroll">
                                <div className="relative h-12 w-12 aspect-square">
                                    <img
                                        className='h-12 w-12 rounded-full'
                                        src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                        alt="" />
                                    <span className='bg-lime-500 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold bg-slate-300 rounded px-2 py-1 my-2 w-full'> Conversations </h1>
                        <div className="overflow-y-scroll h-[calc(100%-8.7rem)] w-full">
                            <hr className='border-t mt-1 mx-1 ' />
                            {
                                allConv.map(c => (
                                    <div className="" key={c._id} onClick={() => setCurrChat(c)}>
                                        <MsgLeftListItem c={c} currUser={user} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className=" w-4/5 p-2">
                    {
                        currChat ?
                            <Conversation currChat={currChat} currUser={user} /> :
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