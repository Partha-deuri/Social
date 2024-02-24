import { useEffect, useState } from "react";
import Ads from "./Ads";
import axios from "axios";

const ProfileRight = ({ currProfile }) => {
    const followers = currProfile?.followers;
    const Mutuals = ({ fid }) => {
        const [fProfile, setFProfile] = useState(null);
        useEffect(() => {
            const fetchUser = async () => {
                const res = await axios.get(`/users/${fid}`);
                setFProfile(res.data)
            }
            fetchUser();
        },[])
        return (
            <div className='flex flex-col items-center w-[30%] p-1 shadow rounded '>
                <img
                    className='rounded p-1 aspect-square'
                    src={fProfile?.profilePic}
                    alt="" />
                <span className="">{fProfile?.username}</span>
            </div>
        )
    }

    return <div className="w-1/2 p-2">
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
                    <span className='font-bold'>{currProfile?.relationship === 2 ? "Taken" : "Single"}</span>
                </div>
            </div>
            <div className="mutuals">
                <h1 className='font-bold bg-slate-300 rounded p-2 my-2'>Followers</h1>
                <div className='flex flex-wrap gap-4'>
                    {
                        followers?.map(f => (
                            <Mutuals key={f} fid={f} />
                        ))
                    }
                </div>
            </div>
        </div>
        <div className="mt-4">
            <Ads />
        </div>
    </div>
}

export default ProfileRight;