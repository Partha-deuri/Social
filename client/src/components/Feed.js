import { useEffect, useState } from 'react'
import Share from './Share'
import Post from './Post'
import axios from 'axios'
import {useUserStore} from '../zustand'
import { useParams } from 'react-router-dom'


const Feed = ({ profile }) => {
    const user = useUserStore((state) => state.user);
    let { uid } = useParams();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchF = async () => {
            try {
                const res = await axios.get(`posts/${profile ? 'timeline/' + uid : 'feed/' + user?._id}`);
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchF();
    }, [profile, uid, user])
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