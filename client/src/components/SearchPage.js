import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SearchPage = ({ list, user }) => {
  const navigate = useNavigate();
  const handleMsg = async ({ uid }) => {
    try {
      await axios.post(`/conv`, {
        senderId: user._id,
        receiverId: uid
      })
      navigate('/messenger')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className=' absolute w-[50vw] -left-1 top-8  max-h-[calc(100vh-70px)] overscroll-y-scroll'>
      {
        list.length === 0 && <div className="">
          <div className=" bg-white rounded-xl shadow-xl border mb-2">
            <div className='flex  gap-2 items-center font-bold rounded-lg border h-12 justify-center'>
              <span className='text-xl text-gray-300'>
                No User Found
              </span>
            </div>
          </div>
        </div>
      }
      {
        list.map(i => (
          <div key={i._id} className=" bg-white rounded-lg shadow-xl border mb-2">
            <div className='flex  gap-2 items-center font-bold rounded border'>
              <Link to={`/profile/${i._id}`} className=" w-1/5 flex justify-center">
                <img
                  className='h-20 rounded-full aspect-square'
                  src={i.profilePic || "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"} alt="" />
              </Link>
              <div className=" flex justify-between w-4/5 ">
                <Link to={`/profile/${i._id}`} className="">
                  {i.username}
                </Link>
                <div className="flex gap-4 items-center px-4 cursor-default">
                  <div onClick={() => { handleMsg({ uid: i._id }) }}
                    className="hover:text-slate-400 cursor-pointer rounded-full">
                    <ChatIcon />
                  </div>
                  <div className="hover:text-slate-400 cursor-pointer rounded-full">
                    <ShareIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }


    </div>
  )
}

export default SearchPage