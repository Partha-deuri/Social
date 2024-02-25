import { useEffect, useState } from "react"
import { useUserStore } from "../zustand"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CoverProfile = ({ currProfile }) => {
    const user = useUserStore(s => s.user);
    const [owner, setOwner] = useState(false);
    const [followText, setFollowText] = useState(" ");
    const navigate = useNavigate();
    useEffect(() => {
        if (user?._id === currProfile?._id) {
            setOwner(true);
        } else {
            setOwner(false);
            if (!user.followings.includes(currProfile?._id))
                setFollowText("Follow");
            else
                setFollowText("Unfollow");

        }
    }, [currProfile?._id, user?._id, user.followings])
    // console.log(user?._id,currProfile?._id);
    const handleFollow = async () => {
        try {
            if (!user.followings.includes(currProfile?._id)) {
                await axios.post(`/users/${currProfile?._id}/follow`, { userId: user._id })
                user.followings.push(currProfile?._id);
                setFollowText("Unfollow");
            } else {
                await axios.post(`/users/${currProfile?._id}/unfollow`, { userId: user._id })
                setFollowText("Follow");
                user.followings = user.followings.filter(e => e !== currProfile._id);
            }
        } catch (err) {
            console.log(err)
        }

    }
    const handleMsg = async () => {
        try {
            await axios.post(`/conv`, {
                senderId: user._id,
                receiverId: currProfile._id
            })
            navigate('/messenger')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="h-2/3 p-2 ">
            <div className="shadow-xl h-full rounded-lg">
                <img className='h-3/4 w-full object-cover rounded-lg'
                    src={currProfile?.coverPic} alt="" />
                <div className="h-1/4 gap-4 flex pl-6  ">
                    <img
                        className='h-40 w-40 rounded-full relative top-[-80px] border-4 border-white'
                        src={currProfile?.profilePic}
                        alt="" />
                    <div className="">
                        <div className="flex items-end gap-4 ">
                            <h1 className="font-extrabold text-2xl mt-2">{currProfile?.username}</h1>
                            <div className="flex gap-2 ml-10">
                                {
                                    owner &&
                                    <div
                                        onClick={() => navigate('/editprofile')}
                                        className="border-2 px-2 bg-violet-400 rounded cursor-pointer font-semibold  hover:bg-violet-200 border-slate-700">
                                        Edit Profile
                                    </div>
                                }
                                {
                                    !owner &&
                                    <div
                                        onClick={handleFollow}
                                        className="border-2 px-2 bg-violet-400 rounded cursor-pointer font-semibold  hover:bg-violet-200 border-slate-700">
                                        {followText}
                                    </div>
                                }
                                {
                                    !owner &&
                                    <div
                                        onClick={handleMsg}
                                        className="border-2 px-2 bg-violet-400 rounded cursor-pointer font-semibold  hover:bg-violet-200 border-slate-700">
                                        Send Message
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="overflow-y-scroll h-1/2">
                            <p>
                                {
                                    currProfile?.desc
                                }
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoverProfile