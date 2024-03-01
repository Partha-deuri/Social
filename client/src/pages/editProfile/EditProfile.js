import React, {  useState } from 'react'
import TopBar from '../../components/TopBar'
import { useUserStore } from '../../zustand'
import VerifyPassword from '../../components/VerifyPassword';

const EditProfile = () => {
  const user = useUserStore(s => s.user);
  const [dp, setDp] = useState("");
  const [cover, setCover] = useState("");
  const newUser = user;
  const [newUserCopy, setNewUserCopy] = useState();
  const [save, setSave] = useState(false);
  const base64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  const handleDPChange = async (e) => {
    if (e.target.files) {
      const cnvImg = await base64(e.target.files[0]);
      setDp(cnvImg);
    }
  }
  const handleCoverChange = async (e) => {
    if (e.target.files) {
      const cnvImg = await base64(e.target.files[0]);
      setCover(cnvImg);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    newUser.profilePic = dp;
    newUser.coverPic = cover;
    setNewUserCopy(newUser);
    setSave(true);
  }
  return (
    <div>
      <TopBar />
      {
        save &&
        <VerifyPassword newUser={newUserCopy} setSave={setSave} />
      }
      <div className="p-4">
        <form className="" onSubmit={handleSubmit}>

          <div className="flex justify-end relative">
            <button
              className='bg-lime-400 px-2 py-1 font-bold rounded-md m-1 border shadow absolute top-0 right-0'
            >
              {"Save Changes"}
            </button>
          </div>
          <div className="flex">
            <div className=" p-2 w-2/3">
              <div className=" p-2 rounded-lg">
                <div className="p-2 border-2  bg-violet-400 rounded-lg shadow-xl w-full flex items-center flex-col ">
                  <div
                    className="font-bold p-2 text-white bg-violet-600 w-1/2 text-center rounded mb-2"
                  >
                    Edit Profile
                  </div>
                  <div className=" p-2 flex w-1/2 items-center  gap-2">
                    <span className="w-1/3 font-semibold">
                      Username:
                    </span>
                    <input
                      type="text"
                      className='border px-2 py-1 rounded bg-transparent w-2/3'
                      onChange={(e) => { newUser.username = e.target.value }}
                      defaultValue={user.username}
                      placeholder='Username'
                      required
                    />
                  </div>
                  <div className="p-2 flex w-1/2 items-center  gap-2">
                    <span className="w-1/3 font-semibold">
                      Name:
                    </span>
                    <input
                      type="text"
                      className='border px-2 py-1 rounded bg-transparent w-2/3'
                      onChange={(e) => { newUser.fullname = e.target.value }}
                      defaultValue={user.fullname}
                      placeholder='Name'
                      required
                    />
                  </div>
                  <div className="p-2 flex w-1/2 items-center  gap-2">
                    <span className="w-1/3 font-semibold">
                      Email:
                    </span>
                    <input
                      type="text"
                      className='border px-2 py-1 rounded bg-transparent w-2/3'
                      onChange={(e) => { newUser.email = e.target.value }}
                      defaultValue={user.email}
                      placeholder='Email'
                      required
                    />
                  </div>
                  <div className="p-2 flex w-1/2 items-start  gap-2">
                    <span className="w-1/3 mt-2 font-semibold">
                      Bio:
                    </span>
                    <textarea
                      type="text"
                      className='border px-2 py-1 rounded bg-transparent w-2/3 min-h-16 max-h-32'
                      onChange={(e) => { newUser.desc = e.target.value }}
                      defaultValue={user.desc}
                      placeholder='Write something about yourself'

                    />
                  </div>
                  <div className="p-2 flex w-1/2 items-center  gap-2">
                    <span className="w-1/3 font-semibold">
                      Gender:
                    </span>
                    <div
                      className='border px-4 py-1 rounded bg-transparent w-2/3 flex gap-2 items-center'
                    >
                      <label className='cursor-pointer'
                        htmlFor="male">
                        <input
                          type="radio"
                          name="gender"
                          value="1"
                          id="male"
                          onChange={(e) => { newUser.gender = e.target.value }}
                        />
                        <span className='px-1'>Male</span>
                      </label>
                      <label className='cursor-pointer'
                        htmlFor="female">
                        <input
                          type="radio"
                          name="gender"
                          value="2"
                          id="female"
                          onChange={(e) => { newUser.gender = e.target.value }}
                        />
                        <span className='px-1'>Female</span>
                      </label>
                      <label className='cursor-pointer'
                        htmlFor="other">
                        <input
                          type="radio"
                          name="gender"
                          value="3"
                          id="other"
                          onChange={(e) => { newUser.gender = e.target.value }}
                        />
                        <span className='px-1'>Other</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-2 flex w-1/2 items-center  gap-2">
                    <span className="w-1/3 font-semibold">
                      Lives in:
                    </span>
                    <input
                      type="text"
                      className='border px-2 py-1 rounded bg-transparent w-2/3'
                      onChange={(e) => { newUser.city = e.target.value }}
                      defaultValue={user.city}
                      placeholder='Lives in'
                    />
                  </div>
                  <div className="p-2 flex w-1/2 items-center  gap-2">
                    <span className="w-1/3 font-semibold">
                      Hometown:
                    </span>
                    <input
                      type="text"
                      className='border px-2 py-1 rounded bg-transparent w-2/3'
                      onChange={(e) => { newUser.from = e.target.value }}
                      defaultValue={user.from}
                      placeholder='Hometown'
                    />
                  </div>

                  <div className="p-2 flex w-1/2 items-center  gap-2">
                    <span className="w-1/3 font-semibold">
                      Relationship :
                    </span>
                    <div
                      className='border px-4 py-1 rounded bg-transparent w-2/3 flex gap-2 items-center'
                    >
                      <label className='cursor-pointer'
                        htmlFor="single">
                        <input
                          type="radio"
                          name="relationship"
                          value="1"
                          id="single"
                          onChange={(e) => { newUser.relationship = e.target.value }}
                        />
                        <span className='px-1'>Single</span>
                      </label>
                      <label className='cursor-pointer'
                        htmlFor="taken">
                        <input
                          type="radio"
                          name="relationship"
                          value="2"
                          id="taken"
                          onChange={(e) => { newUser.relationship = e.target.value }}
                        />
                        <span className='px-1'>Taken</span>
                      </label>
                      <label className='cursor-pointer'
                        htmlFor="other">
                        <input
                          type="radio"
                          name="relationship"
                          value="3"
                          id="other"
                          onChange={(e) => { newUser.relationship = e.target.value }}
                        />
                        <span className='px-1'>Hidden</span>
                      </label>
                    </div>
                  </div>



                </div>
              </div>
            </div>
            <div className="p-4 w-1/3">
              <div className=" flex flex-col items-center gap-1 ">
                <div className="h-[17rem] ">
                  <div className="rounded-full overflow-hidden h-60  hover:h-full">

                    <label
                      htmlFor="dp-inp"
                      className="p-1 bg-yellow-400 border-2 rounded-full cursor-pointer flex flex-col items-center "
                    >
                      <img
                        className='rounded-full object-cover h-56 aspect-square pt-1'
                        src={dp || user.profilePic} alt="Add_image"
                      />
                      <input
                        className='hidden'
                        id='dp-inp'
                        alt=''
                        type='file'
                        accept='image/*'
                        onChange={handleDPChange}
                      />
                      <span className='text-sm p-2 font-semibold text-white hover:inline-block'>
                        Click to edit Image</span>
                    </label>

                  </div>
                </div>
                <div className="w-full px-2 flex justify-center">
                  <div className="h-[14.5rem] overflow-hidden hover:h-full">
                    <label className="p-1 rounded shadow-2xl bg-yellow-400 flex flex-col items-center cursor-pointer">
                      <img
                        className=' object-contain h-56 aspect-auto rounded '
                        src={cover || user.coverPic} alt="Add_image"
                      />
                      <input
                        className='hidden'
                        id='dp-inp'
                        alt=''
                        type='file'
                        accept='image/*'
                        onChange={handleCoverChange}
                      />
                      <span className='text-sm p-1 font-semibold text-white mt-1'>Click to edit Image</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}

export default EditProfile