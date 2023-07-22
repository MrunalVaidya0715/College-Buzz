import { BiCommentDetail, BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi'
import { RxDotFilled } from 'react-icons/rx'
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
const Feed = ({ title, desc, cat, date, pstby, up, dwn, cmt }) => {
    const vote = up - dwn;
    return (
        <Link to="/posts/111">
            <div className=" cursor-pointer flex p-2 w-full justify-start bg-white border-[1px] border-gray-100 shadow-md hover:shadow-lg ease-in-out duration-300 transition-all">
                {/**Action */}
                <div className="flex flex-col items-center justify-start px-4 py-2 ">
                    <BiUpArrowAlt className={`${vote > 0 ? " text-blue-600" : " text-gray-400"}`} size={20} />
                    <span className={`${vote > 0 ? " text-blue-600" : vote < 0 ? " text-red-500" : " text-gray-400"} font-bold`}>
                        {
                            vote > 0 ? (vote) :
                                vote < 0 ? (vote * -1) : 0
                        }
                    </span>
                    <BiDownArrowAlt className={`${vote < 0 ? " text-red-500" : " text-gray-400"}`} size={20} />
                </div>
                {/**Body */}
                <div className="pb-2 flex gap-2 flex-col w-full ">
                    {/* Category */}
                    <div className='rounded-full w-fit px-4 py-1 bg-orange-400'>
                        <p className=' text-white'>{cat}</p>
                    </div>
                    {/**Title */}
                    <div>
                        <h1 className=" font-bold text-lg tracking-wide">{title}</h1>
                    </div>
                    {/*Body */}
                    <div className=' max-h-[200px] pr-2 overflow-y-auto'>
                    <p className=" text-gray-800 text-justify">
                        
                            <LinesEllipsis
                            text={desc}
                            maxLine='2'
                            ellipsis=' ...'
                            trimRight
                            basedOn='letters'
                          />
                        
                    </p>
                </div>
                    {/**User */}
                    <div className="border-t-[1px] pt-4 flex flex-wrap gap-2 items-center w-full justify-between">
                        <div className="flex gap-2 items-center">
                            <img className=" w-8 h-8 object-cover object-center rounded-full" src="/assets/cbProfile.jpeg" alt="" />
                            <div className=' overflow-x-auto flex flex-wrap items-center gap-2'>
                                <p className=" text-gray-500 text-sm">posted by <span className=" whitespace-nowrap font-semibold text-blue-500">{pstby}</span></p>
                                <p className=" whitespace-nowrap text-sm">{date}</p>
                            </div>
                        </div>

                    </div>
                    <div className='mt-1 flex w-full  text-gray-500 items-center gap-1'>
                        <div className='flex gap-1 items-center'>
                            <span>{up}</span>upvotes
                        </div>
                        <div className=' flex'>
                            <RxDotFilled size={16} />
                        </div>
                        <div className='flex gap-1 items-center'>
                            <span>{dwn}</span>downvotes
                        </div>
                        <div className=' flex'>
                            <RxDotFilled size={16} />
                        </div>
                        <div className=' flex items-center gap-1'>
                            <BiCommentDetail className='' size={20} />
                            <span>{cmt}</span>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default Feed