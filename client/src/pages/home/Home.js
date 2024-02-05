import React from 'react'

import TopBar from '../../components/TopBar';
import LeftBar from '../../components/LeftBar';
import Feed from '../../components/Feed';
import RightBar from '../../components/RightBar';
const Home = () => {
  return (
    <div className='h-screen'>
        <TopBar />
        <div className="flex h-[calc(100vh-56px)]">
          <LeftBar/>
          <Feed/>
          <RightBar/>
        </div>
        
    </div>
  )
}

export default Home