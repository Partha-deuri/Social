import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../zustand'
import VerifyPassword from '../../components/VerifyPassword';

const EditProfile = () => {
  const user = useUserStore(s => s.user);
  const [dp, setDp] = useState("");
  const [dpPreview, setDpPreview] = useState("");
  const [cover, setCover] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const newUser = user;
  const [newUserCopy, setNewUserCopy] = useState();
  const [save, setSave] = useState(false);
  const [tempImg, setTempImg] = useState();


  useEffect(() => {
    setTempImg({ dp: user.profilePic, cover: user.coverPic });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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
    if (e.target.files[0]) {
      const cnvImg = await base64(e.target.files[0]);
      setDpPreview(cnvImg);
      setDp(e.target.files[0]);
    }
  }
  const handleCoverChange = async (e) => {
    if (e.target.files[0]) {
      const cnvImg = await base64(e.target.files[0]);
      setCoverPreview(cnvImg);
      setCover(e.target.files[0]);
    }
  }
  // console.log(`'${dpPreview}'`);
  const handleSubmit = (e) => {
    // console.log(user);
    e.preventDefault();
    newUser.profilePic = dp;
    newUser.coverPic = cover;
    if (newUser.profilePic === "") {
      setDpPreview(user.profilePic)
      delete newUser.profilePic;
    }
    if (newUser.coverPic === "") {
      setCoverPreview(user.coverPic)
      delete newUser.coverPic;
    }
    // console.log(user);
    setNewUserCopy(newUser);
    setSave(true);
  }
  return (
    <div className='h-full overflow-y-scroll'>
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
          <div className="flex flex-col-reverse md:flex-row">
            <div className=" p-2 md:w-2/3">
              <div className=" p-2 rounded-lg">
                <div className="p-2 border-2  bg-violet-400 rounded-lg shadow-xl w-full flex items-center flex-col ">
                  <div
                    className="font-bold p-2 text-white bg-violet-600 w-1/2 text-center rounded mb-2"
                  >
                    Edit Profile
                  </div>
                  <div className=" p-2 flex w-full md:w-1/2 items-center  gap-2">
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
                  <div className="p-2 flex w-full md:w-1/2 items-center  gap-2">
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
                  <div className="p-2 flex w-full md:w-1/2 items-center  gap-2">
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
                  <div className="p-2 flex w-full md:w-1/2 items-start  gap-2">
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
                  <div className="p-2 flex w-full md:w-1/2 items-center  gap-2">
                    <span className="w-1/3 font-semibold">
                      Gender:
                    </span>
                    <div
                      className='border px-4 py-1 rounded bg-transparent w-2/3 flex '
                    >
                      <input
                        type="radio"
                        name="gender-g"
                        value="1"
                        id="male"
                        defaultChecked={newUser.gender === 1}
                        onChange={(e) => { newUser.gender = e.target.value }}
                      />
                      <label className='cursor-pointer ml-1 mr-4' htmlFor="male">Male</label>
                      <input
                        type="radio"
                        name="gender-g"
                        value="2"
                        id="female"
                        defaultChecked={newUser.gender === 2}
                        onChange={(e) => { newUser.gender = e.target.value }}
                      />
                      <label className='cursor-pointer ml-1 mr-4' htmlFor="female">Female</label>
                      <input
                        type="radio"
                        name="gender-g"
                        value="3"
                        id="other-g"
                        defaultChecked={newUser.gender === 3}
                        onChange={(e) => { newUser.gender = e.target.value }}
                      />
                      <label className='cursor-pointer ml-1 mr-4' htmlFor="other-g">Other</label>
                    </div>
                  </div>

                  <div className="p-2 flex w-full md:w-1/2 items-center  gap-2">
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
                  <div className="p-2 flex w-full md:w-1/2 items-center  gap-2">
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

                  <div className="p-2 flex w-full md:w-1/2 items-center  gap-2">
                    <span className="w-1/3 font-semibold">
                      Relationship :
                    </span>
                    <div
                      className='border px-4 py-1 rounded bg-transparent w-2/3 flex '
                    >
                      <input
                        type="radio"
                        name="relationship"
                        value="1"
                        id="single"
                        defaultChecked={newUser.relationship === 1}
                        onChange={(e) => { newUser.relationship = e.target.value }}
                      />
                      <label className='cursor-pointer ml-1 mr-4'
                        htmlFor="single">
                        Single
                      </label>
                      <input
                        type="radio"
                        name="relationship"
                        value="2"
                        id="taken"
                        defaultChecked={newUser.relationship === 2}
                        onChange={(e) => { newUser.relationship = e.target.value }}
                      />
                      <label className='cursor-pointer ml-1 mr-4'
                        htmlFor="taken">
                        Taken
                      </label>
                      <input
                        type="radio"
                        name="relationship"
                        value="3"
                        id="other-r"
                        defaultChecked={newUser.relationship === 3}
                        onChange={(e) => { newUser.relationship = e.target.value }}
                      />
                      <label className='cursor-pointer ml-1 mr-4'
                        htmlFor="other-r">
                        Hidden
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <span className='text-sm p-2 font-semibold '>
                Click on the images to edit
              </span>
              <div className=" flex flex-col items-center ">
                <div className="">
                  <div className="rounded-full overflow-hidden h-60  ">

                    <label
                      htmlFor="dp-inp"
                      className="p-1 bg-yellow-400 border-2 rounded-full cursor-pointer flex flex-col items-center "
                    >
                      <img
                        className='rounded-full object-cover h-56 aspect-square pt-1'
                        src={dpPreview || user.profilePic || tempImg.dp} alt="Add_image"
                      />
                      <input
                        className='hidden'
                        id='dp-inp'
                        alt=''
                        type='file'
                        accept='image/*'
                        onChange={handleDPChange}
                      />
                    </label>

                  </div>
                </div>
                <div className="w-full px-2 flex justify-center">
                  <div className="">
                    <label className="p-1 rounded shadow-2xl bg-yellow-400 flex flex-col items-center cursor-pointer">
                      <img
                        className=' object-contain h-56 aspect-auto rounded '
                        src={coverPreview || user.coverPic || tempImg.cover} alt="Add_image"
                      />
                      <input
                        className='hidden'
                        id='cp-inp'
                        alt=''
                        type='file'
                        accept='image/*'
                        onChange={handleCoverChange}
                      />
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