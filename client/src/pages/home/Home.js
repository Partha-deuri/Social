import React, { useEffect } from 'react'

import TopBar from '../../components/TopBar';
import LeftBar from '../../components/LeftBar';
import Feed from '../../components/Feed';
import RightBar from '../../components/RightBar';
import {useUserStore} from '../../zustand';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const user = useUserStore(s=>s.user);
  useEffect(()=>{
    if(user===null){
      navigate('/login');
    }
    console.log(user);
  })
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