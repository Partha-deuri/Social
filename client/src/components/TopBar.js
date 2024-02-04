import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
const TopBar = () => {
  return (
    <div className='sticky top-0 bg-violet-700 flex items-center justify-between '>
      {/* left */}
      <div className="p-3  w-1/4">
        <span className='text-white cursor-pointer font-bold text-xl outline-dashed hover:outline-red-700 hover:bg-violet-900'>
          <span className='text-green-400 p-1'>So</span>cial&nbsp;
        </span>
      </div>
      {/* center */}
      <div className="w-1/2">
        <label className="bg-white rounded p-1 flex">
          <SearchIcon className='w-1/12 mx-1' />
          <input type='text' placeholder='Search Here' className='rounded-sm pl-2 focus:outline-none w-11/12' />
        </label>
      </div>
      {/* right */}
      <div className="flex gap-4 mr-4  h-8 items-center w-1/4 justify-end">
        <PersonIcon className='hover:text-white cursor-pointer' />
        <NotificationsIcon className='hover:text-white cursor-pointer' />
        <MessageIcon className='hover:text-white cursor-pointer' />
        <SettingsIcon className='hover:text-white cursor-pointer' />
      </div>

    </div>
  )
}

export default TopBar