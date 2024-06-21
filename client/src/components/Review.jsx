import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { RiFlagLine } from "react-icons/ri";
import { RxDotFilled } from 'react-icons/rx'
import { formatDistanceToNow } from "date-fns";
import parse from 'html-react-parser'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {toast} from 'react-hot-toast'
const Review = ({ _id: id, desc, createdAt, userInfo: pstby, upvote: up, downvote: dwn, downvotedBy, upvotedBy }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const navigate = useNavigate()
    const queryClient = useQueryClient();


    const upvoteMutation = useMutation((id) => newRequest.patch(`/answers/upvote/${id}`),
        {
            onMutate: () => { },
            onError: (error) => {
                console.error("Upvote error:", error);
            },
            onSettled: () => {
                queryClient.invalidateQueries("answers");
            },
        }
    );
    const handleUp = async () => {
        if (!user) {
            navigate('/login')
        }

        try {
            await upvoteMutation.mutateAsync(id);

        } catch (error) {
            console.error(error);
        }
    };
    const downvoteMutation = useMutation((id) => newRequest.patch(`/answers/downvote/${id}`),
        {
            onMutate: () => { },
            onError: (error) => {
                console.error("Downvote error:", error);
            },
            onSettled: () => {
                queryClient.invalidateQueries("answers");
            },
        }
    );

    const handleDown = async () => {
        if (!user) {
            navigate('/login')
        }

        try {
            await downvoteMutation.mutateAsync(id);


        } catch (error) {
            console.error(error);
        }
    };

    const deletePost = useMutation((id) => {
        return newRequest.delete(`answers/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("answers");
        },
    });

    const vote = up - dwn;

    const [isOption, setisOption] = useState(false);
    const handleOption = () => {
        setisOption(prev => !prev)
    }
    return (
        <div className=" relative w-full gap-2 flex flex-col px-4 py-2 bg-white border-[1px]">
            {isOption && <div onClick={() => setisOption(false)} className=" absolute top-0 right-0 w-full h-full" />}
            <div className="flex items-center justify-between">
                <div className="flex w-full gap-2 items-center">
                    <img className=" w-8 h-8 object-cover object-center rounded-full" src={pstby.profileImg || "/assets/noProfile.png"} alt={pstby.username} />
                    <div className=' overflow-x-auto flex flex-wrap items-center gap-1'>
                        <p className="flex items-center gap-1 text-gray-500 text-sm"><span className="hidden sm:block">answered by </span>
                            <span className=" whitespace-nowrap font-semibold text-blue-500">
                                {
                                    user?._id === pstby._id ? "You" : pstby.username
                                }
                            </span></p>
                        <RxDotFilled className=" text-gray-500" size={16} />
                        <p className=" whitespace-nowrap text-sm">{formatDistanceToNow(new Date(createdAt))}</p>
                    </div>
                </div>
                <div className=" relative flex items-center">

                    <BsThreeDotsVertical onClick={handleOption} className=" cursor-pointer text-gray-700 hover:text-black duration-150 transition-colors ease-in-out" size={22} />
                    <div onClick={() => setisOption(false)} className={` ${isOption ? "flex " : "hidden"} absolute top-0 right-5 px-1 py-2 flex-col items-start bg-white  border-[1px] rounded-md  `}>

                        {
                            user?._id === pstby._id ? (
                                <>
                                    <div className="px-2 py-1 flex w-full cursor-pointer items-center gap-1 hover:bg-gray-100 active:bg-gray-50 transition-all ease-in-out duration-200">
                                        <BiEditAlt size={20} />
                                        <p>Edit</p>
                                    </div>
                                    <div onClick={() => {
                                        deletePost.mutate(id)
                                        toast.success("Answer Deleted")
                                    }} className="px-2 py-1 flex w-full cursor-pointer items-center gap-1 hover:bg-gray-100 active:bg-gray-50 transition-all ease-in-out duration-200">
                                        <MdOutlineDeleteOutline className=" text-red-600" size={20} />
                                        <p>Delete</p>
                                    </div>
                                </>
                            ) : (
                                <div className="px-2 py-1 flex w-full cursor-pointer items-center gap-1 hover:bg-gray-100 active:bg-gray-50 transition-all ease-in-out duration-200">
                                    <RiFlagLine size={18} />
                                    <p>Report</p>
                                </div>
                            )
                        }


                    </div>
                </div>
            </div>
            <div className='p-2 rounded-md border-[1px] max-h-[200px] overflow-y-auto scrollbar-none'>
                <div className=" text-gray-800 text-justify">
                    {parse(desc)}
                </div>
            </div>
            <div className='mt-1 flex w-full  text-gray-500 items-center justify-end gap-1'>
                <div className=" flex items-center gap-3">
                    <FaArrowUp onClick={handleUp} className={`cursor-pointer ${upvotedBy.includes(user?._id) ? "text-blue-500" : " text-gray-400"}`} size={20} />
                    <span className={`${vote > 0 ? " text-blue-600" : vote < 0 ? " text-red-500" : " text-gray-400"} font-semibold text-lg`}>
                        {
                            vote > 0 ? (vote) :
                                vote < 0 ? (vote * -1) : 0
                        }
                    </span>
                    <FaArrowDown onClick={handleDown} className={`cursor-pointer ${downvotedBy.includes(user?._id) ? "text-red-500" : " text-gray-400"}`} size={20} />
                </div>

            </div>
        </div>
    )
}

export default Review