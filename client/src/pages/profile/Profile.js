import React, { useEffect, useState } from 'react'
import LeftBar from '../../components/LeftBar'
import Feed from '../../components/Feed'
import CoverProfile from '../../components/CoverProfile'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProfileRight from '../../components/ProfileRight'




const Profile = () => {
  let { uid } = useParams()
  const [currProfile, setCurrProfile] = useState();
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const res = await axios.get(`/users/${uid}`);
        setCurrProfile(res.data)
      }
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  }, [uid])
  return (
    <div className="flex justify-between h-[calc(100vh-56px)] overflow-y-scroll w-full">
      <LeftBar />
      <div className="h-[calc(100vh-56px)] w-full overflow-y-scroll">
        <CoverProfile uid={uid} userProfile={currProfile} />
        <div className="flex flex-col-reverse md:flex-row">
          <Feed profile />
          <ProfileRight currProfile={currProfile} />
        </div>
      </div>
    </div>

  )
}

export default Profile