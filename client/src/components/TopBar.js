import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from '../zustand';
import Settings from './Settings';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import toast, { Toaster } from 'react-hot-toast';
import { socket } from '../App';


const TopBar = () => {
  const user = useUserStore(s => s.user);
  const [settings, setSettings] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newMsgList, setNewMsgList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("getMsg", data => {
      toast("Received a new Message", {
        style: {
          border: '1px solid black',
        },
      });
      setNewMsgList(prev => [...prev, data.senderId]);
    })
  }, [])


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchText.trim() !== "")
        navigate(`/search/users/?q=${searchText}`);
      setSearchText("");
      // document.getElementById("search-inp").value = "";
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <div className="h-[100dvh]">
      <div className='sticky top-0 bg-violet-700 flex items-center z-10 justify-between h-14'>
        <Toaster position='top-center' reverseOrder={false} />
        {/* left */}
        <div className="p-3  w-1/4 ">
          <Link to={'/'} className='flex gap-2'>
            <span className='text-white cursor-pointer font-bold text-xl outline-dashed hover:outline-red-400 '>
              <span className='text-green-400 p-1'>So</span>cial&nbsp;
            </span>
            <HomeIcon className=' text-white hover:text-red-400 border-2 rounded-full aspect-square' />
          </Link>
        </div>
        {/* center */}
        <div className="w-1/2">
          <form className='w-full' onSubmit={handleSearch}>
            <label className="bg-white rounded-3xl p-1 flex justify-between w-full ">
              <input
                id='search-inp'
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                type='text'
                placeholder='Search username'
                className='rounded-sm px-2 focus:outline-none w-full' />
              <button className=' md:w-1/12 rounded-full'>
                <SearchIcon />
              </button>
            </label>
          </form>
        </div>
        {/* right */}
        <div className="flex gap-4 mr-4  h-8 items-center w-1/4 justify-end">
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center">
            <img
              className='rounded-full h-8 w-8 object-cover border-2 border-transparent hover:border-white cursor-pointer'
              src={user?.profilePic}
              alt="DP"
            />
          </Link>

          <Link to={'/messenger'} className="relative hidden md:block hover:text-white">
            <MessageIcon className=' cursor-pointer' />
            {
              newMsgList.length > 0 &&
              <span
                className='absolute -top-1 -right-1  text-[12px] bg-red-500 rounded-full h-4 w-4 flex items-center justify-center'>
                {newMsgList.length}
              </span>
            }
          </Link>
          {/* <div className="relative hidden md:block">
            <NotificationsIcon className='hover:text-white cursor-pointer' />
          </div> */}
          <div className='relative'>
            {
              settings &&
              <CloseIcon
                onClick={() => setSettings(!settings)}
                className='hover:text-white cursor-pointer'
              />
            }
            {
              !settings &&
              <>
                <MenuIcon
                  onClick={() => setSettings(!settings)}
                  className='hover:text-white cursor-pointer hidden'
                />
              </>
            }
            {
              settings &&
              <Settings socket={socket} setSettings={setSettings} />
            }
          </div>
        </div>
      </div>
      <div className="h-[calc(100dvh-3.5rem)]">
        <Outlet />
      </div>
    </div>
  )
}

export default TopBar