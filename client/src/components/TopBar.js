import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
// import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { useUserStore } from '../zustand';
import Settings from './Settings';
import CloseIcon from '@mui/icons-material/Close';
import SearchPage from './SearchPage';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
const TopBar = () => {
  const user = useUserStore(s => s.user);
  const [settings, setSettings] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/users/search?q=${searchText}`)
      setSearchList(res.data);
      setSearch(true);
      // setSearchText("");
      // document.getElementById("search-inp").value = "";
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <div className='sticky top-0 bg-violet-700 flex items-center z-10 justify-between h-14'>
      <div className="relative">
        {
          search && <SearchPage list={searchList} user={user} />
        }
      </div>
      {/* left */}
      <div className="p-3  w-1/4 ">
        <Link to={'/'}>
          <span className='text-white cursor-pointer font-bold text-xl outline-dashed hover:outline-red-400 '>
            <span className='text-green-400 p-1'>So</span>cial&nbsp;
          </span>
        </Link>
      </div>
      {/* center */}
      <div className="w-1/2">
        <label className="bg-white rounded-3xl p-1 flex justify-between w-full ">
          <input
            id='search-inp'
            onChange={(e) => setSearchText(e.target.value)}
            type='text'
            placeholder='Search username'
            className='rounded-sm px-2 focus:outline-none w-full' />
          <button className=' md:w-1/12 rounded-full' onClick={handleSearch}>
            <SearchIcon />
          </button>
        </label>
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
        {/* <div className="relative">
          <PersonIcon className='hover:text-white cursor-pointer' />
          <span
            className='absolute top-[-4px] right-[-2px] z-[-1] text-[12px] bg-red-500 rounded-full h-4 w-4 flex items-center justify-center'>
            1
          </span>
        </div> */}
        <Link to={'/messenger'} className="relative hidden md:block hover:text-white">
          <MessageIcon className=' cursor-pointer' />
          {/* <span
            className='absolute top-[-4px] right-[-2px]  text-[12px] bg-red-500 rounded-full h-4 w-4 flex items-center justify-center'>
            
          </span> */}
        </Link>
        <div className="relative hidden md:block">
          <NotificationsIcon className='hover:text-white cursor-pointer' />
          {/* <span
            className='absolute top-[-4px] right-[-2px] z-[-1] text-[12px] bg-red-500 rounded-full h-4 w-4 flex items-center justify-center'>
            1
          </span> */}
        </div>
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
            <Settings />
          }
        </div>
      </div>

    </div>
  )
}

export default TopBar