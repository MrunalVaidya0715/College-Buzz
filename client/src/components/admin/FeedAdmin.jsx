import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi'
import { RxDotFilled } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import { formatDistanceToNow } from 'date-fns';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../../utils/newRequest';
import { toast } from 'react-hot-toast'
const formatTimeAgo = (createdAt) => {
    const secondsAgo = Math.floor((new Date() - new Date(createdAt)) / 1000);

    if (secondsAgo < 60) {
        return `${secondsAgo}s ago`;
    } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        return `${minutesAgo}m ago`;
    } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        return `${hoursAgo}h ago`;
    } else {
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    }
};

const FeedAdmin = ({ _id, title, desc, category, createdAt, userInfo: pstby, upvote: up, downvote: dwn, cmt }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const vote = up - dwn;
    const timeAgo = formatTimeAgo(createdAt);
    const htmlToString = desc.replace(/<[^>]+>/g, '');

    
    const queryClient = useQueryClient();
    const deletePost = useMutation((id) => {
        return newRequest.delete(`admin/posts/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("adminPosts");
            
        },
    });
    return (

        <div className=" flex p-2 w-full justify-start bg-white border-[1px] border-gray-100 shadow-sm hover:shadow-lg ease-in-out duration-300 transition-all">
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
                {/* Category & DeleteButn */}
                <div className='flex items-center w-full justify-between'>
                    <div className='rounded-full w-fit px-4 py-1 bg-orange-400'>
                        <p className=' text-white'>{category}</p>
                    </div>
                    <MdOutlineDeleteOutline onClick={() => {
                        deletePost.mutate(_id)
                        toast.success("Question Deleted")
                    }}
                        className=" cursor-pointer text-gray-400 hover:text-red-600" size={20} />
                </div>
                {/**Title */}
                <div>
                    <h1 className=" font-bold text-lg tracking-wide">{title}</h1>
                </div>
                {/*Body */}
                <div className=' max-h-[200px scrollbar-none pr-2 overflow-y-auto'>


                    <LinesEllipsis
                        text={htmlToString}
                        maxLine='3'
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
                            <p className=" text-gray-500 text-sm">posted by <span className=" whitespace-nowrap font-semibold text-blue-500">
                                {
                                    user?._id === pstby._id ? "You" : pstby.username
                                }</span></p>
                            <div className=' flex'>
                                <RxDotFilled className=' text-gray-500' size={16} />
                            </div>
                            <p className=" whitespace-nowrap text-sm">{timeAgo}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default FeedAdmin;