import { useEffect, useState } from 'react'
import Share from './Share'
import Post from './Post'
import axios from 'axios'
import { useUserStore } from '../zustand'
import { Link, useParams } from 'react-router-dom'
import FollowUsers from './FollowUsers'


const Feed = ({ profile }) => {
    const user = useUserStore((state) => state.user);
    let { uid } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchF = async () => {
            try {
                const res = await axios.get(`posts/${profile ? 'timeline/' + uid : 'feed/' + user?._id}`);
                setPosts(res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                }));
            } catch (err) {
                console.log(err);
            }
        }
        fetchF();
    }, [profile, uid, user])
    return (
        <div className={`${profile ? "" : "lg:w-3/5"} w-full p-2 overflow-y-scroll`}>
            <div className="">
                {
                    !profile &&
                    <Share setPosts={setPosts} posts={posts} />
                }
                <div className="">
                    {
                        posts.map(p => <Post key={p._id} post={p} setPosts={setPosts} />)
                    }
                </div>
                {
                    !profile &&
                    <FollowUsers />
                }{
                    profile &&
                    <Link
                        to={'/'}
                        className="flex justify-center my-2 p-2 border rounded-md bg-violet-400 text-white font-semibold text-xl">
                        <span>Go Home</span>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Feed