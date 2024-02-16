import React from 'react'

const CoverProfile = () => {
    return (
        <div className="p-2 h-2/3">
            <img className='h-3/4 w-full object-cover'
                src="https://img.freepik.com/free-photo/breathtaking-shot-beautiful-stones-turquoise-water-lake-hills-background_181624-12847.jpg?w=826&t=st=1708058584~exp=1708059184~hmac=a6d759c6420237585d838472be89d2e15f1251cc3342af96c82f18146ecbd7cc" alt="" />
            <div className="h-1/4 gap-4 flex pl-6 bg-green-300">
                <img
                    className='h-40 w-40 rounded-full relative top-[-80px] border-4 border-white'
                    src="https://avatars.githubusercontent.com/u/130203363?v=4"
                    alt="" />
                <div className="overflow-y-scroll">
                    <span className="font-extrabold text-2xl">Partha Deuri</span>
                    <div className="">
                        <p>
                            Bio Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa repellendus natus molestiae debitis quo incidunt, provident nam porro explicabo neque ullam consequuntur ipsa laudantium numquam, officiis alias fugiat at tenetur?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoverProfile