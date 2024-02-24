import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import {useUserStore} from '../zustand';
const TopBar = () => {
  const user = useUserStore(s => s.user);
  return (
    <div className='sticky top-0 bg-violet-700 flex items-center z-10 justify-between h-14'>
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
        <label className="bg-white rounded-3xl p-1 flex">
          <SearchIcon className='w-1/12 mx-1' />
          <input type='text' placeholder='Search Here' className='rounded-sm pl-2 focus:outline-none w-11/12' />
        </label>
      </div>
      {/* right */}
      <div className="flex gap-4 mr-4  h-8 items-center w-1/4 justify-end">
        <Link
          to={`/profile/${user?._id}`}
          className="flex items-center">
          <img
            className='rounded-full h-8 w-8 object-cover border-2 border-transparent hover:border-white cursor-pointer'
            src={"https://assets.leetcode.com/users/Partha-deuri/avatar_1708430209.png"}
            alt="DP"
          />
        </Link>
        <div className="relative">
          <PersonIcon className='hover:text-white cursor-pointer' />
          <span
            className='absolute top-[-4px] right-[-2px] z-[-1] text-[12px] bg-red-500 rounded-full h-4 w-4 flex items-center justify-center'>
            1
          </span>
        </div>
        <Link to={'/messenger'} className="relative hover:text-white">
          <MessageIcon className=' cursor-pointer' />
          <span
            className='absolute top-[-4px] right-[-2px]  text-[12px] bg-red-500 rounded-full h-4 w-4 flex items-center justify-center'>
            1
          </span>
        </Link>
        <div className="relative">
          <NotificationsIcon className='hover:text-white cursor-pointer' />
          <span
            className='absolute top-[-4px] right-[-2px] z-[-1] text-[12px] bg-red-500 rounded-full h-4 w-4 flex items-center justify-center'>
            1
          </span>
        </div>
        <div className="relative">
          <SettingsIcon className='hover:text-white cursor-pointer' />

        </div>
      </div>

    </div>
  )
}

export default TopBar