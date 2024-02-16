import React from 'react'
import Share from './Share'
import Post from './Post'

const Feed = ({profile}) => {
    return (
        <div className = {`${profile?"w-full":"w-3/5"} p-2 overflow-y-scroll`}>
            <div className="">
                <Share />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default Feed