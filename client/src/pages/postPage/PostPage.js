import React, { useEffect, useState } from 'react'
import Post from '../../components/Post'
import { useParams } from 'react-router-dom'
import axios from "axios";
import Comment from '../../components/Comment';
import { useUserStore } from '../../zustand';

const PostPage = () => {
    let { postid } = useParams();
    const user = useUserStore(state => state.user);
    const token = useUserStore(state => state.token);
    const [post, setPost] = useState();
    const [allComments, setAllComments] = useState([]);
    const [commenting, setCommenting] = useState(false);
    const [cmntL, setCmntL] = useState(null);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/posts/${postid}`)
                setPost(res.data);
                const res2 = await axios.get(`/posts/${postid}/comments/all`);
                setAllComments(res2.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPost();
    }, [postid])
    useEffect(() => {
        setCmntL(allComments.length);
    }, [allComments.length])

    const [newComment, setNewComment] = useState("");
    const handleComment = async (e) => {
        e.preventDefault();
        if (newComment.trim() !== "") {
            setCommenting(true);
            const res3 = await axios.post(`/posts/${postid}/comment`, {
                userId: user._id,
                comment: newComment
            },
            {headers: { "Authorization": `Bearer ${token}` } }
        )
            setAllComments([...allComments, res3.data]);
        }
        document.querySelector("#comment-box").value = "";
        setNewComment("");
        setCommenting(false);
    }
    return (

        <div className='p-2 h-full overflow-y-scroll'>
            {
                post &&
                <Post post={post} cmntL={cmntL} setCmntL={setCmntL} />
            }
            {post &&
                <div className="mt-4 p-2 border-2 rounded-lg relative ">
                    <form onSubmit={handleComment} className="w-full flex gap-2 sticky -top-2 z-10 bg-white pt-2 pb-1">
                        <input id="comment-box"
                            onChange={(e) => setNewComment(e.target.value)}
                            className='border-2 p-2 border-slate-400 w-full rounded'
                            type='text'
                            placeholder='Write someting here...'
                        />
                        <button

                            className='px-2 bg-blue-500 rounded font-bold text-white'>
                            {commenting ? "Commenting..." : "Comment"}
                        </button>
                    </form>

                    <div className="flex flex-col-reverse w-full overflow-x-clip">
                        {
                            allComments.map(c => <Comment
                                key={c._id}
                                c={c}
                                p={post}
                                setAllComments={setAllComments}
                            />)
                        }
                    </div>
                </div>
            }
        </div>

    )
}

export default PostPage