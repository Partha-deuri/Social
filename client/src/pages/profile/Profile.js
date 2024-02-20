import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import LeftBar from '../../components/LeftBar'
import Feed from '../../components/Feed'
import CoverProfile from '../../components/CoverProfile'
import Ads from '../../components/Ads'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProfileRight = () => {
  return <div className="w-1/2 p-2">
    <div className="shadow-xl border-2 rounded p-4">
      <div className="mb-4 ">
        <h1 className='text-3xl text-center mb-4 font-bold bg-slate-300 rounded p-2 my-2'>User Info</h1>
        <div>
          <span>Lives in </span>
          <span className='font-bold'>Nirjuli </span>
        </div>
        <div>
          <span>From </span>
          <span className='font-bold'>Bihpuria </span>
        </div>
        <div>
          <span>Relationship: </span>
          <span className='font-bold'>Single </span>
        </div>
      </div>
      <div className="mutuals">
        <h1 className='font-bold bg-slate-300 rounded p-2 my-2'>Mutual Friends</h1>
        <div className='flex flex-wrap gap-4'>
          <div className='flex flex-col items-center w-[30%] p-1 shadow rounded '>
            <img
              className='rounded p-1 aspect-square'
              src="https://avatars.githubusercontent.com/u/130203363?v=4"
              alt="" />
            <span className="">Partha</span>
          </div>
          <div className='flex flex-col items-center w-[30%] p-1 shadow rounded '>
            <img
              className='rounded p-1 aspect-square'
              src="https://avatars.githubusercontent.com/u/130203363?v=4"
              alt="" />
            <span className="">Partha</span>
          </div>
          <div className='flex flex-col items-center w-[30%] p-1 shadow rounded '>
            <img
              className='rounded p-1 aspect-square'
              src="https://avatars.githubusercontent.com/u/130203363?v=4"
              alt="" />
            <span className="">Partha</span>
          </div>
          <div className='flex flex-col items-center w-[30%] p-1 shadow rounded '>
            <img
              className='rounded p-1 aspect-square'
              src="https://avatars.githubusercontent.com/u/130203363?v=4"
              alt="" />
            <span className="">Partha</span>
          </div>
          
          
          
         
        </div>
      </div>
    </div>
    <div className="mt-4">
      <Ads />
      <Ads />
      <Ads />
      <Ads />

    </div>
  </div>
}

const Profile = () => {
  let {uid} = useParams()
    const [currProfile,setCurrProfile] = useState();
    useEffect(()=>{
        const fetchUser = async () => {
            const res = await axios.get(`/users/${uid}`);
            setCurrProfile(res.data)
        }
        fetchUser();
    },[uid])
  return (
    <div className='w-full'>
      <TopBar />
      <div className="flex justify-between h-[calc(100vh-56px)] overflow-y-scroll">
        <LeftBar />
        <div className="h-[calc(100vh-56px)] w-full overflow-y-scroll">
          <CoverProfile currProfile={currProfile} />
          <div className="flex ">
            <Feed profile />
            <ProfileRight />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile