import { BiCommentDetail } from "react-icons/bi"
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiFlagLine } from 'react-icons/ri'
import { useEffect, useState } from "react"
import Reviews from "../../components/Reviews"
import { RxDotFilled } from "react-icons/rx"
import { useParams } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";
import parser from 'html-react-parser';
import { formatDistanceToNow } from "date-fns"
const Post = () => {

  const { id } = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["question"],
    queryFn: () =>
      newRequest.get(`/questions/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data)
  
  const [vote, setVote] = useState(0); 

  // Updating the vote state once the data is available or changes
  useEffect(() => {
    if (data) {
      const newVote = data.upvote - data.downvote;
      setVote(newVote);
    }
  }, [data]);

  const handleUp = () => {
    setVote((prevVote) => prevVote + 1);
  };

  const handleDown = () => {
    setVote((prevVote) => prevVote - 1);
  };

  const [isOption, setisOption] = useState(false);
  const handleOption = () => {
    setisOption(prev => !prev)
  }
  return (
    <div className="flex flex-col w-full">
      {/**Post Details */}
      {
        isLoading ? (<h2 className=" text-center">Loading Question Details...</h2>) :
          error ? (<h2 className=" text-center">Something went wrong</h2>) : (
            <div className=" relative px-4 py-2 bg-white border-[1px] shadow-sm flex flex-col w-full gap-2">
              {isOption && <div onClick={() => setisOption(false)} className=" absolute top-0 right-0 w-full h-full" />}
              {/**User, time */}
              <div className="flex w-full items-center justify-between">
                <div className="flex  gap-2 items-center">
                  <img className=" w-8 h-8 object-cover object-center rounded-full" src="/assets/cbProfile.jpeg" alt="" />
                  <div className=' overflow-x-auto flex gap-1 md:gap-0 flex-wrap items-center'>
                    <p className="flex items-center gap-1 text-gray-500 text-sm"><span className="hidden sm:block">posted by </span><span className=" whitespace-nowrap font-semibold text-blue-500">Mrunal Vaidya</span></p>
                    <RxDotFilled className="hidden sm:block text-gray-500" size={16} />
                    <p className=" whitespace-nowrap text-sm">{formatDistanceToNow(new Date(data.createdAt))}</p>
                  </div>
                </div>

                <div className=" relative flex items-center">
                  
                  <BsThreeDotsVertical onClick={handleOption} className=" cursor-pointer text-gray-700 hover:text-black duration-150 transition-colors ease-in-out" size={22} />
                  <div onClick={() => setisOption(false)} className={` ${isOption ? "flex " : "hidden"} cursor-pointer absolute right-5 px-4 py-2 items-center gap-2 bg-white hover:bg-gray-100 active:bg-gray-50 border-[1px] rounded-md transition-all ease-in-out duration-200 `}>
                    <RiFlagLine size={16} />
                    <p>Report</p>
                  </div>
                </div>
              </div>
              {/* Category */}
              <div className='rounded-full border-[1px] border-orange-600 w-fit px-4 py-1 bg-orange-400'>
                <p className=' text-white'>{data.category}</p>
              </div>
              {/* Title */}
              <div className="">
                <h1 className=" font-bold text-lg tracking-wide">{data.title}</h1>
              </div>
              {/* Desc */}
              <div className='p-2 rounded-md border-[1px]'>
                <p className=" text-gray-800 text-justify">
                  {parser(data.desc)}
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
          )
      }


      {/**Comments/replies */}
      <Reviews />

    </div>
  )
}

export default Post