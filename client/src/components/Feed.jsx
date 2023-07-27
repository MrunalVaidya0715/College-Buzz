import { BiCommentDetail, BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi'
import { RxDotFilled } from 'react-icons/rx'
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import parser from 'html-react-parser';
import { formatDistanceToNow } from 'date-fns';
const Feed = ({ title, desc, category, createdAt, userInfo:pstby, upvote:up, downvote:dwn, cmt }) => {
    const vote = up - dwn;
    const timeAgo =  formatDistanceToNow(new Date(createdAt));
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
                        <p className=' text-white'>{category}</p>
                    </div>
                    {/**Title */}
                    <div>
                        <h1 className=" font-bold text-lg tracking-wide">{title}</h1>
                    </div>
                    {/*Body */}
                    <div className=' max-h-[200px scrollbar-none pr-2 overflow-y-auto'>


                        <LinesEllipsis
                            text={parser(desc)}
                            maxLine='2'
                            ellipsis=' ...'
                            trimRight
                            basedOn='letters'
                        />


                    </div>
                    {/**User */}
                    <div className="border-t-[1px] pt-4 flex flex-wrap gap-2 items-center w-full justify-between">
                        <div className="flex gap-2 items-center">
                            <img className=" w-8 h-8 object-cover object-center rounded-full" src={pstby.profileImg || "/assets/noProfile.png"} alt={pstby.username} />
                            <div className=' overflow-x-auto flex flex-wrap items-center'>
                                <p className=" text-gray-500 text-sm">posted by <span className=" whitespace-nowrap font-semibold text-blue-500">{pstby.username}</span></p>
                                <div className=' flex'>
                                    <RxDotFilled className=' text-gray-500' size={16} />
                                </div>
                                <p className=" whitespace-nowrap text-sm">{timeAgo}</p>
                            </div>
                        </div>

                    </div>
                    <div className='mt-1 flex flex-wrap w-full  text-gray-500 items-center gap-1'>
                        <div className='flex gap-1 items-center'>
                            <p className='flex gap-1 items-center'><span>{up}</span><span className='hidden md:block'>upvotes</span><BiUpArrowAlt className='md:hidden' size={20} /></p>
                        </div>
                        <div className=' flex'>
                            <RxDotFilled size={16} />
                        </div>
                        <div className='flex gap-1 items-center'>
                            <p className='flex gap-1 items-center'><span>{dwn}</span><span className='hidden md:block'>upvotes</span><BiDownArrowAlt className='md:hidden' size={20} /></p>
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