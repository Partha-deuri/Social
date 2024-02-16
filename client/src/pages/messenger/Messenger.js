import React from 'react'
import TopBar from '../../components/TopBar'
import Conversation from '../../components/Conversation'

const Messenger = () => {
    return (
        <div>
            <TopBar />
            <div className="flex h-[calc(100vh-56px)]">
                <div className="w-1/5">
                    <div className="">
                        <h1 className='font-bold bg-slate-300 rounded px-2 py-1 my-2 mx-1'> Online</h1>
                        <div className="flex online gap-2 p-2 overflow-x-scroll">
                            <div className="relative h-12 w-12 aspect-square">
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                    alt="" />
                                <span className='bg-lime-500 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                            </div>
                            <div className="relative h-12 w-12 aspect-square">
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                    alt="" />
                                <span className='bg-lime-500 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                            </div>
                            <div className="relative h-12 w-12 aspect-square">
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                    alt="" />
                                <span className='bg-lime-500 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                            </div>
                            <div className="relative h-12 w-12 aspect-square">
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                    alt="" />
                                <span className='bg-lime-500 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                            </div>
                            <div className="relative h-12 w-12 aspect-square">
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                    alt="" />
                                <span className='bg-lime-500 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                            </div>
                            <div className="relative h-12 w-12 aspect-square">
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                    alt="" />
                                <span className='bg-lime-500 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                            </div>
                            <div className="relative h-12 w-12 aspect-square">
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                    alt="" />
                                <span className='bg-lime-500 border-2 border-white top-0 p-[4px] h-0.5 w-0.5 rounded-full absolute right-[-1px]'></span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-y-scroll h-[calc(100%-7.8rem)]">
                        <h1 className='font-bold bg-slate-300 rounded px-2 py-1 my-2 mx-1'> Conversations </h1>
                        <hr className='border-t mt-1 ' />
                        <div className=" flex items-center px-2 py-1 gap-2 border-b  rounded mx-1">
                            <div className=" h-12 w-12 aspect-square ">
                                <img
                                    className='h-12 w-12 rounded-full  border-2'
                                    src="https://avatars.githubusercontent.com/u/130203363?v=4"
                                    alt="" />
                            </div>
                            <span>Partha</span>
                        </div>


                    </div>
                </div>
                <div className=" w-4/5 p-2">
                    <Conversation />
                </div>
            </div>
        </div>
    )
}

export default Messenger