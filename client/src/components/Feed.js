import React from 'react'
import Share from './Share'
import Post from './Post'

const Feed = () => {
    return (
        <div className='w-3/5 p-2'>
            <div className="">
                <Share/>
                <Post/>
            </div>
        </div>
    )
}

export default Feed