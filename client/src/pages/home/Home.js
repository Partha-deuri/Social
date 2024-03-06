import React, { useEffect, useRef, useState } from 'react'

import TopBar from '../../components/TopBar';
import LeftBar from '../../components/LeftBar';
import Feed from '../../components/Feed';
import RightBar from '../../components/RightBar';
import { useUserStore } from '../../zustand';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from "socket.io-client";


const Home = () => {
  const navigate = useNavigate();
  const user = useUserStore(s => s.user);
  const setUser = useUserStore(s => s.setUser);
  const socket = useRef()
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // socket.current = io(process.env.REACT_APP_SOCKET_URL);
    socket.current = io("ws://social-api-by-partha.onrender.com:8900");
    if (user === null) {
      navigate('/login');
    } else {
      const fetchUser = async () => {
        const res = await axios.get(`/users/${user?._id}`);
        setUser(res.data);
      }
      fetchUser();
    }
    // console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    socket.current.on("getAllUsers", users => {
      setOnlineUsers(
        user.followings.filter(f => users.some(u => u.userId === f))
      );
    });
  }, [user])
  
  return (
    <div className='h-screen'>
      <TopBar />
      <div className="flex h-[calc(100vh-56px)] w-full">
        <LeftBar />
        <Feed />
        <RightBar onlineUsers={onlineUsers} user={user}/>
      </div>

    </div>
  )
}

export default Home