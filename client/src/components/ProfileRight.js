import { useEffect, useState } from "react";
// import Ads from "./Ads";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ProfileRight = ({ currProfile }) => {
    const { uid } = useParams();
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        try {
            const fetchFriend = async () => {
                const res = await axios.get(`/users/${uid}/followers`);
                setFollowers(res.data);
            }
            fetchFriend();
        } catch (err) {
            console.log(err);
        }
    }, [uid])
    const Mutuals = ({ f }) => {
        return (
            <Link to={`/profile/${f?._id}`}
                className='flex flex-col items-center w-[30%]  p-1 shadow rounded '>
                <img
                    className='rounded p-1 aspect-square'
                    src={f?.profilePic}
                    alt="" />
                <span className="">{f?.username}</span>
            </Link>
        )
    }

    return (
        <div className="w-full md:w-1/2 p-2">
            <div className="shadow-xl border-2 rounded p-4">
                <div className="mb-4 ">
                    <h1 className='text-3xl text-center mb-4 font-bold bg-slate-300 rounded p-2 my-2'>User Info</h1>
                    <div>
                        <span>Lives in </span>
                        <span className='font-bold'>{currProfile?.city}</span>
                    </div>
                    <div>
                        <span>From </span>
                        <span className='font-bold'>{currProfile?.from}</span>
                    </div>
                    <div>
                        <span>Relationship: </span>
                        <span className='font-bold'>{currProfile?.relationship === 1 ? "Single" : currProfile?.relationship === 2 ? "Taken" : "Hidden"}</span>
                    </div>
                </div>
                <div className="mutuals">
                    <h1 className='font-bold bg-slate-300 rounded p-2 my-2'>Followers</h1>
                    <div className='flex flex-wrap gap-4'>
                        {
                            followers?.map(f => (
                                <Mutuals key={f?._id} f={f} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {/* <Ads /> */}
            </div>
        </div>
    )
}

export default ProfileRight;