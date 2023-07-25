import { useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { RiFlagLine } from "react-icons/ri";
import { RxDotFilled } from 'react-icons/rx'
const Review = () => {
    const [vote, setVote] = useState(20)
    const handleUp = () => {
        setVote(vote + 1)
    }
    const handleDown = () => {
        setVote(vote - 1)
    }
    const [isOption, setisOption] = useState(false);
    const handleOption = () => {
        setisOption(prev => !prev)
    }
    return (
        <div className=" relative w-full gap-2 flex flex-col px-4 py-2 bg-white border-[1px]">
            {isOption && <div onClick={() => setisOption(false)} className=" absolute top-0 right-0 w-full h-full" />}
            <div className="flex items-center justify-between">
                <div className="flex w-full gap-2 items-center">
                    <img className=" w-8 h-8 object-cover object-center rounded-full" src="/assets/cbProfile.jpeg" alt="" />
                    <div className=' overflow-x-auto flex flex-wrap items-center gap-1'>
                        <p className="flex items-center gap-1 text-gray-500 text-sm"><span className="hidden sm:block">answered by </span><span className=" whitespace-nowrap font-semibold text-blue-500">John Doe</span></p>
                        <RxDotFilled className=" text-gray-500" size={16} />
                        <p className=" whitespace-nowrap text-sm">4hr</p>
                    </div>
                </div>
                <div className=" relative flex gap-2 items-center">

                    <BsThreeDotsVertical onClick={handleOption} className=" cursor-pointer text-gray-700 hover:text-black duration-150 transition-colors ease-in-out" size={22} />
                    <div onClick={() => setisOption(false)} className={` ${isOption ? "flex " : "hidden"} cursor-pointer absolute right-6 px-4 py-2 items-center gap-2 bg-white hover:bg-gray-100 active:bg-gray-50 border-[1px] rounded-md transition-all ease-in-out duration-200 `}>
                        <RiFlagLine size={16} />
                        <p>Report</p>
                    </div>
                </div>
            </div>
            <div className='p-2 rounded-md border-[1px] max-h-[200px] overflow-y-auto scrollbar-none'>
                <p className=" text-gray-800 text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, delectus dolores nemo quaerat eius beatae provident rem iste numquam totam libero consequuntur distinctio, natus soluta, ut minus officiis? Dolores non mollitia corrupti nobis neque. Quia incidunt magni porro repudiandae cupiditate excepturi consequatur unde ipsa ut corporis, eveniet quas non expedita!

                </p>
            </div>
            <div className='mt-1 flex w-full  text-gray-500 items-center justify-end gap-1'>
                <div className=" flex items-center gap-3">
                    <FaArrowUp onClick={handleUp} className=" cursor-pointer" size={20} />
                    <div className=''>
                        <p className=" font-semibold text-lg">{vote}</p>
                    </div>
                    <FaArrowDown onClick={handleDown} className=" cursor-pointer" size={20} />
                </div>

            </div>
        </div>
    )
}

export default Review