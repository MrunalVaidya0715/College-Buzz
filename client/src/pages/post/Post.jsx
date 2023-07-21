import { BiCommentDetail } from "react-icons/bi"
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import {RiFlagLine} from 'react-icons/ri'
import { useState } from "react"
const Post = () => {
  const [vote, setVote] = useState(50)
  const handleUp = () => {
    setVote(vote + 1)
  }
  const handleDown = () => {
    setVote(vote - 1)
  }

  const [isOption, setisOption] = useState(false);
  const handleOption = () =>{
    setisOption(prev => !prev)
  }
  return (
    <div className="flex flex-col w-full">
      {/**Post Details */}
      <div className="px-4 py-2 bg-white border-[1px] shadow-sm flex flex-col w-full gap-2">
        {/**User, time */}
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full gap-2 items-center">
            <img className=" w-8 h-8 object-cover object-center rounded-full" src="/assets/cbProfile.jpeg" alt="" />
            <div className=' overflow-x-auto flex flex-wrap items-center gap-2'>
              <p className=" text-gray-500 text-sm">posted by <span className=" whitespace-nowrap font-semibold text-blue-500">Mrunal Vaidya</span></p>
              <p className=" whitespace-nowrap text-sm">12hr ago</p>
            </div>
          </div>

          <div className=" relative flex gap-2 items-center">
            <p className=" text-gray-500 text-sm whitespace-nowrap">Date: <span className=" text-gray-600 font-semibold">21-07-23</span></p>
            <BsThreeDotsVertical onClick={handleOption} className=" cursor-pointer text-gray-700 hover:text-black duration-150 transition-colors ease-in-out" size={22} />
            <div onClick={()=>setisOption(false)} className={` ${isOption ? "flex ": "hidden"} cursor-pointer absolute -left-2 px-4 py-2 items-center gap-2 bg-white hover:bg-gray-100 active:bg-gray-50 border-[1px] rounded-md transition-all ease-in-out duration-200 `}>
              <RiFlagLine size={16}/>
              <p>Report</p>
            </div>
          </div>
        </div>
        {/* Title */}
        <div className="">
          <h1 className=" font-bold text-lg tracking-wide">Navigating Freshman Year: Tips for a Successful Start!Navigating Freshman Year: Tips for a Successful Start!</h1>
        </div>
        {/* Desc */}
        <div className='p-2 rounded-md border-[1px] max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-w-4'>
          <p className=" text-gray-800 text-justify">Are you about to begin your exciting college journey? Join this forum to get valuable insights and advice from experienced college students. From time management and study tips to making new friends and joining clubs, we've got you covered. Let's help each other make the most of our freshman year!

          </p>
        </div>
        {/*Actions */}
        <div className='mt-1 flex w-full  text-gray-500 items-center justify-between gap-1'>
          <div className=" flex items-center gap-3">
            <FaArrowUp onClick={handleUp} className=" cursor-pointer" size={20} />
            <div className=''>
              <p className=" font-semibold text-lg">{vote}</p>
            </div>
            <FaArrowDown onClick={handleDown} className=" cursor-pointer" size={20} />
          </div>

          <div className=' flex items-center gap-1'>
            <BiCommentDetail className='' size={25} />
            <span>10</span>
          </div>
        </div>

      </div>


      {/**Comments/replies */}

    </div>
  )
}

export default Post