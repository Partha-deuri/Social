import Ads from "./Ads";

const ProfileRight = () => {

    const Mutuals = () => {
        return (
            <div className='flex flex-col items-center w-[30%] p-1 shadow rounded '>
                <img
                    className='rounded p-1 aspect-square'
                    src="https://avatars.githubusercontent.com/u/130203363?v=4"
                    alt="" />
                <span className="">Partha</span>
            </div>
        )
    }

    return <div className="w-1/2 p-2">
        <div className="shadow-xl border-2 rounded p-4">
            <div className="mb-4 ">
                <h1 className='text-3xl text-center mb-4 font-bold bg-slate-300 rounded p-2 my-2'>User Info</h1>
                <div>
                    <span>Lives in </span>
                    <span className='font-bold'>Nirjuli </span>
                </div>
                <div>
                    <span>From </span>
                    <span className='font-bold'>Bihpuria </span>
                </div>
                <div>
                    <span>Relationship: </span>
                    <span className='font-bold'>Single </span>
                </div>
            </div>
            <div className="mutuals">
                <h1 className='font-bold bg-slate-300 rounded p-2 my-2'>Mutual Friends</h1>
                <div className='flex flex-wrap gap-4'>

                    <Mutuals />




                </div>
            </div>
        </div>
        <div className="mt-4">
            <Ads />
            <Ads />
            <Ads />
            <Ads />

        </div>
    </div>
}

export default ProfileRight;