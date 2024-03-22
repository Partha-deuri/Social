import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../zustand';
import TopBar from './TopBar';

const SearchPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const user = useUserStore(s => s.user);
  const [searchParams] = useSearchParams();
  let searchText = searchParams.get('q');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const searchUsers = async () => {
      const res = await axios.get(`/users/search?q=${searchText}`)
      setList(res.data);
    }
    setLoading(true);
    searchUsers();
    setLoading(false);
  }, [searchText])
  const handleMsg = async ({ uid }) => {
    try {
      const res = await axios.post(`/conv`, {
        senderId: user._id,
        receiverId: uid
      })
      navigate(`/messenger/${res.data[0]._id}`);
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <TopBar />
      <div className='flex justify-center  w-[100vw] p-2  max-h-[calc(100vh-70px)] overscroll-y-scroll'>
        <div className="w-[95%] sm:w-[80%] md:w-[50%] ">
          {
            !list && <div className="">
              <div className=" bg-white rounded-xl shadow-xl border mb-2">
                <div className='flex  gap-2 items-center font-bold rounded-lg border h-12 justify-center'>
                  <span className='text-xl text-gray-300'>
                    {"Loading..."}
                  </span>
                </div>
              </div>
            </div>
          }
          {
            list?.length === 0 && <div className="">
              <div className=" bg-white rounded-xl shadow-xl border mb-2">
                <div className='flex  gap-2 items-center font-bold rounded-lg border h-12 justify-center'>
                  <span className='text-xl text-gray-300'>
                    {"No User Found"}
                  </span>
                </div>
              </div>
            </div>
          }
          {
            list &&
            list.map(i => (
              <div key={i._id} className=" bg-white rounded-lg shadow-xl border mb-2">
                <div className='flex  gap-2 items-center font-bold rounded border'>
                  <Link to={`/profile/${i._id}`} className=" w-1/5 flex justify-center">
                    <img
                      className='h-20 rounded-full aspect-square p-2'
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

      </div>
    </>
  )
}

export default SearchPage