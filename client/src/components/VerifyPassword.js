import React, { useState } from 'react'
import { useUserStore } from '../zustand'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const VerifyPassword = ({ newUser, setSave }) => {
    const user = useUserStore(s => s.user)
    const token = useUserStore(s => s.token)
    const setUser = useUserStore(s => s.setUser)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/auth/verify', { password: e.target[0].value },
                { headers: { "Authorization": `Bearer ${token}` } })
            if (res.status === 200) {
                const dpData = new FormData();
                dpData.append("image", newUser.profilePic);
                dpData.append("userId", user._id);
                dpData.append("type", "profile");
                const coverData = new FormData();
                coverData.append("image", newUser.coverPic);
                coverData.append("userId", user._id);
                coverData.append("type", "cover");
                if (newUser.profilePic) {
                    const { profilePic, ...rest } = newUser;
                    await axios.put(`/users/${user._id}/upload`, dpData, {
                        headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                    });
                    newUser = rest;
                }
                if (newUser.coverPic) {
                    const { coverPic, ...rest } = newUser;
                    await axios.put(`/users/${user._id}/upload`, coverData, {
                        headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                    });
                    newUser = rest;
                }
                const res2 = await axios.put(`/users/${user._id}`, newUser,
                    { headers: { "Authorization": `Bearer ${token}` } })
                setTimeout(() => {
                    toast.success("Updated successfully")
                    setUser(res2.data);
                }, 10)
                navigate(`/profile/${res2.data._id}`);
            } else {
                toast.error(res.data)
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);
        }
        setLoading(false);
    }
    return (
        <div className='absolute w-full h-[calc(100vh-60px)]  z-10 p-2'>

            <div className=" p-2 flex  justify-center items-center h-full ">
                <form
                    onSubmit={handleSubmit}
                    className="bg-violet-400 p-4 rounded-xl md:w-[30%] h-[50%] flex flex-col justify-between shadow-xl border relative z-40">
                    <div
                        onClick={() => setSave(false)}
                        className='absolute font-bold bg-red text-white rounded-full bg-red-500 h-8 w-8 flex justify-center items-center aspect-square -top-4 -right-4 cursor-pointer border border-black'>
                        X
                    </div>
                    <div className="font-bold text-center mb-4 p-2 rounded bg-violet-600 text-white">
                        <span>Verify User</span>
                    </div>
                    <div className="">
                        <span className='text-sm'>Please verify yourself before saving changes</span>
                        <input
                            className='rounded px-2 py-1 my-2 w-full'
                            placeholder='Password'
                            type="password"
                            name="" id=""
                            required
                        />
                    </div>
                    <button
                        className={`border-2 px-2 py-1 w-full rounded font-bold text-white               hover:bg-slate-300 ${loading && "cursor-not-allowed"} `}
                    >
                        {loading ? "Verifying..." : "Confirm"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default VerifyPassword