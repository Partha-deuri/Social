import React from 'react'
import Post from '../../components/Post'
import TopBar from '../../components/TopBar'

const PostPage = () => {
    const Comment = () => {
        return (
            <div className="px-1  mt-4 rounded flex items-start border shadow-md">
                <div className=" mx-1 my-2 h-12 w-12 aspect-square">
                    <img
                        className='h-12 w-12 aspect-square rounded-full'
                        src="https://avatars.githubusercontent.com/u/130203363?v=4" alt="" />
                </div>
                <div className="p-2">
                    <div className="flex gap-2 items-center">
                        <span className='font-bold cursor-pointer'>Partha</span>
                        <span className='text-sm text-gray-400'>3 minutes ago</span>
                    </div>
                    <div className="text-sm">
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione vel exercitationem illo perspiciatis a possimus?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, magni unde animi minus voluptatum voluptatibus aliquid qui excepturi veniam ipsum eveniet, inventore adipisci ea incidunt vero, provident vel debitis rem?
                           
                        </span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <TopBar />
            <div className='p-2'>
                <Post />
                <div className="mt-4 p-2 border-2 rounded-lg relative">
                    <div className="w-full flex gap-2 sticky top-[56px] bg-white pt-2 pb-1">
                        <input
                            className='border-2 p-2 border-black w-full rounded'
                            type='text'
                            placeholder='Write someting here...'
                        />
                        <button className='px-2 bg-blue-500 rounded font-bold text-white'> Comment </button>
                    </div>

                    <div className="">
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostPage