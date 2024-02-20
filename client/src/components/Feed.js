import { useEffect, useState } from 'react'
import Share from './Share'
import Post from './Post'
import axios from 'axios'
import useUserStore from '../zustand'


const Feed = ({ profile }) => {
    const userId = useUserStore((state) => state.userId);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchF = async () => {
            const res = await axios.get(`posts/timeline/${userId}`);
            setPosts(res.data);
        }
        fetchF();
    }, [])
    return (
        <div className={`${profile ? "w-full" : "w-3/5"} p-2 overflow-y-scroll`}>
            <div className="">
                <Share setPosts={setPosts} posts={posts} />
                <div className="flex flex-col-reverse">
                    {
                        posts.map(p => <Post key={p._id} post={p} />)
                    }
                </div>

            </div>
        </div>
    )
}

export default Feed