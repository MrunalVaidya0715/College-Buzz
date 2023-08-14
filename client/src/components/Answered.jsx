import { formatDistanceToNow } from 'date-fns'
import parse from 'html-react-parser'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { RxDotFilled } from 'react-icons/rx'
import { Link } from 'react-router-dom'
const Answered = ({ userId, userInfo, queTitle, questionId, desc, upvote, downvote, createdAt }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const vote = upvote - downvote
    return (
        <Link to={`/posts/${questionId._id}`}>
            <div className="flex flex-col gap-2  p-2 w-full justify-start bg-white border-[1px] border-gray-100 shadow-sm hover:shadow-lg ease-in-out duration-300 transition-all">
                <div className="py-1 flex flex-col gap-1 w-full border-b-2">
                    {/* Category */}
                    <div className='rounded-full w-fit px-4 py-1 bg-orange-400'>
                        <p className=' text-white'>{questionId.category}</p>
                    </div>
                    {/**Title */}
                    <div>
                        <h1 className=" font-bold text-lg tracking-wide">{queTitle}</h1>
                    </div>
                </div>
                <div className="flex w-full gap-1 items-center">
                    <img className=" w-8 h-8 object-cover object-center rounded-full" src={user?.profileImg || "/assets/noProfile.png"} alt={questionId.userInfo.username} />
                    <div className=' overflow-x-auto flex flex-wrap items-center gap-1'>
                        <p className="flex items-center gap-1 text-gray-500 text-sm"><span className="hidden sm:block">answered by </span>
                            <span className=" whitespace-nowrap font-semibold text-blue-500">
                                {
                                    user?._id === userId ? "You" : questionId.userInfo.username
                                }
                            </span>
                        </p>
                        <RxDotFilled className=" text-gray-500" size={16} />
                        <p className=" whitespace-nowrap text-sm">{formatDistanceToNow(new Date(createdAt))}</p>
                    </div>
                </div>
                <div className='p-2 rounded-md border-[1px] max-h-[200px] overflow-y-auto scrollbar-none'>
                    <div className=" text-gray-800 text-justify">
                        {parse(desc)}
                    </div>
                </div>
                <div className='mt-1 flex w-full  text-gray-500 items-center justify-end gap-1'>
                    <div className=" flex items-center gap-3">
                        <FaArrowUp size={20} />
                        <span className={`${vote > 0 ? " text-blue-600" : vote < 0 ? " text-red-500" : " text-gray-400"} font-semibold text-lg`}>
                            {
                                vote > 0 ? (vote) :
                                    vote < 0 ? (vote * -1) : 0
                            }
                        </span>
                        <FaArrowDown size={20} />
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default Answered