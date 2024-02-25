import React, { useEffect, useState } from 'react'
import Post from '../../components/Post'
import TopBar from '../../components/TopBar'
import { useParams } from 'react-router-dom'
import axios from "axios";
import Comment from '../../components/Comment';
import { useUserStore } from '../../zustand';

const PostPage = () => {
    let { postid } = useParams();
    const user = useUserStore(state => state.user);
    const [post, setPost] = useState();
    const [allComments, setAllComments] = useState([]);
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

    const [newComment, setNewComment] = useState("");
    const handleComment = async (e) => {
        if (newComment.trim() !== "") {
            const res3 = await axios.post(`/posts/${postid}/comment`, {
                userId: user._id,
                comment: newComment
            })
            setAllComments([...allComments, res3.data]);
        }
        document.querySelector("#comment-box").value = "";
        setNewComment("");
    }
    return (
        <>
            <TopBar />
            <div className='p-2'>
                {
                    post &&
                    <Post post={post} />
                }
                {post &&
                    <div className="mt-4 p-2 border-2 rounded-lg relative ">
                        <div className="w-full flex gap-2 sticky top-[56px] bg-white pt-2 pb-1">
                            <input id="comment-box"
                                onChange={(e) => setNewComment(e.target.value)}
                                className='border-2 p-2 border-slate-400 w-full rounded'
                                type='text'
                                placeholder='Write someting here...' 
                            />
                            <button
                                onClick={(e) => handleComment()}
                                className='px-2 bg-blue-500 rounded font-bold text-white'> Comment </button>
                        </div>

                        <div className="flex flex-col-reverse">
                            {
                                allComments.map(c => <Comment key={c._id} c={c} />)
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default PostPage