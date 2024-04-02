import React, { useEffect, useState } from 'react'

import LeftBar from '../../components/LeftBar';
import Feed from '../../components/Feed';
import RightBar from '../../components/RightBar';
import { useUserStore } from '../../zustand';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { socket } from '../../App';


const Home = () => {
  const navigate = useNavigate();
  const user = useUserStore(s => s.user);
  const setUser = useUserStore(s => s.setUser);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // socket.current = io(process.env.REACT_APP_SOCKET_URL);
    if (user === null) {
      navigate('/login');
    } else {
      try {
        const fetchUser = async () => {
          const res = await axios.get(`/users/${user?._id}`);
          setUser(res.data);
        }
        fetchUser();
      } catch (err) {
        console.log(err);
      }
    }
    // console.log(socket.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    socket.emit("addUser", user?._id);
    socket.on("getAllUsers", users => {
      setOnlineUsers(
        user.followings.filter(f => users.some(u => u?.userId === f))
      );
    });
  }, [user?._id, user.followings])

  return (
    <div className='h-screen'>
      <div className="flex h-[calc(100vh-56px)] w-full">
        <LeftBar />
        <Feed />
        <RightBar onlineUsers={onlineUsers} user={user} />
      </div>

    </div>
  )
}

export default Home