
const CoverProfile = ({currProfile}) => {
    
    return (
        <div className="h-2/3 p-2 ">
            <div className="shadow-xl h-full rounded-lg">
                <img className='h-3/4 w-full object-cover rounded-lg'
                    src={currProfile?.coverPic} alt="" />
                <div className="h-1/4 gap-4 flex pl-6  ">
                    <img
                        className='h-40 w-40 rounded-full relative top-[-80px] border-4 border-white'
                        src={currProfile?.profilePic}
                        alt="" />
                    <div className="">
                        <h1 className="font-extrabold text-2xl mt-2">{currProfile?.username}</h1>
                        <div className="overflow-y-scroll h-1/2">
                            <p>
                                {currProfile?.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoverProfile