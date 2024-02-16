import React from 'react'
import TopBar from '../../components/TopBar'
import LeftBar from '../../components/LeftBar'
import Feed from '../../components/Feed'

import CoverProfile from '../../components/CoverProfile'

const Profile = () => {
  return (
    <div className='w-full'>
      <TopBar />
      <div className="flex justify-between h-[calc(100vh-56px)] overflow-y-scroll">
        <LeftBar />
        <div className="h-[calc(100vh-56px)] w-full overflow-y-scroll">
          <CoverProfile />
          <div className="flex ">
            <Feed profile />
            <div className="w-1/2 bg-red-400 p-4"></div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile