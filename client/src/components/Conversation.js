import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';


const Conversation = () => {
    const Me = () => {
        const [time,setTime] = useState("");
        const handleClick =()=>{
            if(time===""){
                setTime("4:00 pm");
            }
            else{
                setTime("");
            }
        }
        return (
            <div className="m-2">
                <div className='flex flex-row-reverse gap-2 items-start'>
                    <div className=" h-8 w-8 aspect-square ">
                        <img
                            className='h-8 w-8 rounded-full  border-2'
                            src="https://avatars.githubusercontent.com/u/130203363?v=4"
                            alt="" />
                    </div>
                    <div  className="max-w-[70%] min-w-[30%]">
                        <div onClick={handleClick} className="bg-sky-300 p-2 rounded-md shadow-lg ">
                            <span>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, illo.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, fugiat minima cumque soluta laborum possimus praesentium aliquam voluptatum sunt maxime molestiae odit quas eaque porro distinctio, nam exercitationem, totam deleniti?
                            </span>
                        </div>
                        <div className='text-sm text-right px-2' >{time}</div>
                    </div>
                </div>
            </div>
        )
    }
    const Friend = () => {
        const [time,setTime] = useState("");
        const handleClick =()=>{
            if(time===""){
                setTime("4:00 pm");
            }
            else{
                setTime("");
            }
        }
        return (
            <div className="m-2">
                <div className='flex gap-2 items-start'>
                    <div className=" h-8 w-8 aspect-square ">
                        <img
                            className='h-8 w-8 rounded-full  border-2'
                            src="https://avatars.githubusercontent.com/u/130203363?v=4"
                            alt="" />
                    </div>
                    <div  className="max-w-[70%] min-w-[30%]">
                        <div onClick={handleClick} className="bg-gray-300 p-2 rounded-md shadow-lg ">
                            <span>
                                Lorem ipsum dolor sit amet  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus debitis dolor sed suscipit maiores quaerat repudiandae natus est maxime excepturi?
                            </span>
                        </div>
                        <div className='text-sm px-2' >{time}</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className=" shadow-xl h-full rounded-lg border-2  relative">
            <div className="rounded-md">
                <div className=" flex items-center px-2 py-1 gap-2 rounded mx-1">
                    <div className=" h-12 w-12 aspect-square ">
                        <img
                            className='h-12 w-12 rounded-full  border-2'
                            src="https://avatars.githubusercontent.com/u/130203363?v=4"
                            alt="" />
                    </div>
                    <div className="flex flex-col">
                        <span className='text-md font-bold'>Partha</span>
                        <span className='text-sm text-slate-500'>Active</span>
                    </div>
                </div>
                <div className="">

                </div>
            </div>
            <hr className='border-b-1 border-slate-500' />
            <div className="h-[78%] p-2 ">
                <div className="flex flex-col-reverse overflow-y-scroll h-full ">
                    <Me />
                    <Friend />
                    <Me />
                    <Me />
                    <Friend />
                    <Me />
                    <Friend />
                    <Me />
                    <Friend />
                    <Friend />
                    <Me />
                </div>
            </div>

            <div className="w-full bottom-0 absolute p-2 ">
                <div className="img preview"></div>
                <div className="flex gap-2 items-center px-2">
                    <label className='cursor-pointer bg-gray-200 aspect-square rounded-full p-2'>
                        <AddIcon fontSize='large' />
                        <input className='hidden' type="file" accept="image/*" name="" id="" />
                    </label>
                    <textarea className='w-full border-2 rounded h-16 resize-none pl-1 border-black' />
                    <button className=' bg-lime-500 p-2 rounded text-white font-bold'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Conversation