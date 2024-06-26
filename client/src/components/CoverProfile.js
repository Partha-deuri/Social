import { useEffect, useState } from "react"
import { useUserStore } from "../zustand"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CoverProfile = ({ uid, userProfile }) => {
    const user = useUserStore(s => s.user);
    const token = useUserStore(s => s.token);
    const [owner, setOwner] = useState(false);
    const [currProfile, setCurrProfile] = useState(userProfile);
    const [followText, setFollowText] = useState(" ");
    const navigate = useNavigate();
    // let { uid } = useParams()

    const fetchUser = async () => {
        const res = await axios.get(`/users/${uid}`);
        setCurrProfile(res.data)
    }
    useEffect(() => {
        try {
            fetchUser();
        } catch (err) {
            console.log(err);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid])

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
            fetchUser();
        } catch (err) {
            console.log(err)
        }

    }
    const handleMsg = async () => {
        try {
            const res = await axios.post(`/conv`, {
                senderId: user?._id,
                receiverId: currProfile?._id
            }
        , { headers: { "Authorization": `Bearer ${token}` } })
            navigate(`/messenger/${res.data[0]?._id}`);
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="md:h-2/3 p-2 ">
            <div className="shadow-xl h-full rounded-lg">
                <img className='md:h-3/4 w-full object-cover rounded-lg'
                    src={currProfile?.coverPic || ""} alt="" />
                <div className="h-1/4 gap-4 flex pl-6  ">
                    <img
                        className='h-40 w-40 rounded-full relative top-[-80px] border-4 border-white'
                        src={currProfile?.profilePic || ""}
                        alt="" />
                    <div className="">
                        <div className="flex md:gap-2 flex-wrap">
                            <h1 className="font-extrabold text-2xl mt-2">
                                {currProfile?.fullname || "Loading..."}
                            </h1>
                            <h1 className="font-bold text-xl mt-2">
                                {`(${currProfile?.username || "Loading..."})`}
                            </h1>
                            <div className="flex gap-2 md:ml-10 mt-1">
                                {
                                    owner &&
                                    <div
                                        onClick={() => navigate('/editprofile')}
                                        className="border-2 px-2 bg-violet-400 rounded cursor-pointer font-semibold  hover:bg-violet-200 border-slate-700  flex items-center">
                                        Edit Profile
                                    </div>
                                }
                                {
                                    !owner &&
                                    <div
                                        onClick={handleFollow}
                                        className="border-2 px-2 bg-violet-400 rounded cursor-pointer font-semibold  hover:bg-violet-200 border-slate-700 flex items-center">
                                        {followText}
                                    </div>
                                }
                                {
                                    !owner &&
                                    <div
                                        onClick={handleMsg}
                                        className="border-2 px-2 bg-violet-400 rounded cursor-pointer font-semibold  hover:bg-violet-200 border-slate-700 flex items-center">
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