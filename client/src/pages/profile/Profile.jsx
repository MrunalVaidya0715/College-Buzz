import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import {  useParams } from 'react-router-dom'
import newRequest from '../../../utils/newRequest'
const Profile = () => {
    const [section, setSection] = useState("question")
    const handleSection = (option) => {
        setSection(option)
    }
    const user = JSON.parse(localStorage.getItem("currentUser"))

    const { userId } = useParams()
    const { isLoading:isUserLoading, error:userError, data:userData } = useQuery({
        queryKey: ["user"],
        queryFn: () =>
            newRequest.get(`/users/${userId}`).then((res) => {
                return res.data;
            }),
    });
    return (
        <div className="flex flex-col w-full h-full bg-white">
            <div className=" relative flex flex-col gap-2 items-center justify-center w-full h-[50%] bg-gradient-to-b from-transparent via-blue-200 to-blue-400">
                <img className="  object-contain w-[50%] h-[50%] rounded-lg" src="/assets/noProfile.png" alt="" />
                <div className="flex w-full flex-col items-center">
                    <h1 className=" font-semibold text-xl">{userData.username}</h1>
                    <p className=" text-sm text-gray-700">Member since <span className=' text-black'>{formatDistanceToNow(new Date(userData.createdAt))}</span></p>
                </div>
                {/* <div className="mt-4 gap-8  grid grid-cols-2">
                    <div className="flex flex-col items-center">
                        <p className=" text-3xl font-bold">25</p>
                        <h1 className=" font-semibold text-lg">Questioned</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className=" text-3xl font-bold">47</p>
                        <h1 className=" font-semibold text-lg">Answered</h1>
                    </div>

                </div> */}
            </div>

            <div className="relative -top-6 grid w-full md:w-[90%] grid-cols-2  self-center">
                <div onClick={() => handleSection("question")} className={` ${section === "question" ? "bg-blue-500 text-white" : "bg-white"} cursor-pointer hover:bg-slate-200 hover:text-black active:bg-slate-300 border-2 border-r-[1px] rounded-l-full border-gray-700 flex gap-1 w-full h-12 justify-center items-center transition-all duration-150 ease-in-out`}>
                    <div className='flex gap-1 items-baseline'>
                        <p className=" text-sm">Questions</p>
                        <p className=" text-lg font-semibold">25</p>
                    </div>
                </div>
                <div onClick={() => handleSection("answer")} className={` ${section === "answer" ? "bg-blue-500 text-white" : "bg-white"} cursor-pointer hover:bg-slate-200 hover:text-black active:bg-slate-300 border-2 border-l-[1px] rounded-r-full border-gray-700 flex gap-1 w-full h-12 justify-center items-center transition-all duration-150 ease-in-out`}>
                    <div className='flex gap-1 items-baseline'>
                        <p className=" text-sm">Answers</p>
                        <p className=" text-lg font-semibold">47</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile