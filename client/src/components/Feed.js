import React from 'react'
import Share from './Share'
import Post from './Post'

const Feed = () => {
    return (
        <div className='w-3/5 p-2 overflow-y-scroll'>
            <div className="">
                <Share/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    )
}

export default Feed