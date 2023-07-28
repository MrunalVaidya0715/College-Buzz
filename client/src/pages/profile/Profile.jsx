import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import newRequest from '../../../utils/newRequest'
import Feed from '../../components/Feed'
import { MdOutlineAddAPhoto } from 'react-icons/md'
const Profile = () => {
    const [section, setSection] = useState("question")
    const handleSection = (option) => {
        setSection(option)
    }
    const user = JSON.parse(localStorage.getItem("currentUser"))

    const { userId } = useParams()
    const { isLoading: isUserLoading, error: userError, data: userData } = useQuery({
        queryKey: ["user"],
        queryFn: () =>
            newRequest.get(`/users/${userId}`).then((res) => {
                return res.data;
            }),
    });
    const { isLoading: isQuesLoading, error: quesError, data: quesData } = useQuery({
        queryKey: ["userQuestion"],
        queryFn: () =>
            newRequest.get(`/questions/${userId}`).then((res) => {
                return res.data;
            }),
    });

    return (
        <div className="flex flex-col w-full h-full  bg-white">
            {
                isUserLoading ? "Loading Info..." :
                    userError ? "Something went Wrong" : (
                        <div className=" relative flex flex-col gap-2 items-center justify-center w-full h-[50%] max-h-[300px] bg-gradient-to-b from-transparent via-blue-200 to-blue-400">
                            <div className=' relative w-fit h-[50%]'>
                                <div className=' cursor-pointer absolute border-[1px] border-gray-200 -bottom-2 -right-4 p-2 bg-white hover:bg-slate-200 active:bg-slate-300 rounded-full transition-all duration-150 ease-in-out'><MdOutlineAddAPhoto size={16} /></div>
                                <img className="  object-contain w-full h-full rounded-lg" src={userData.profileImg || "/assets/noProfile.png"} alt="" />
                            </div>
                            <div className="flex w-full flex-col items-center">
                                <h1 className=" font-semibold text-xl">{userData.username}</h1>
                                <p className=" text-sm text-gray-700">Member since <span className=' text-black'>{formatDistanceToNow(new Date(userData.createdAt))}</span></p>
                            </div>
                        </div>
                    )
            }

            <div className="relative -top-6 grid w-full md:w-[90%] grid-cols-2  self-center">
                <div onClick={() => handleSection("question")} className={` ${section === "question" ? "bg-blue-500 text-white" : "bg-white"} cursor-pointer hover:bg-slate-200 hover:text-black active:bg-slate-300 border-2 border-r-[1px] rounded-l-full border-gray-700 flex gap-1 w-full h-12 justify-center items-center transition-all duration-150 ease-in-out`}>
                    <div className='flex gap-1 items-baseline'>
                        <p className=" text-sm">Questions</p>
                        {
                            isQuesLoading ? "-" :
                                quesError ? "?" : <p className=" text-lg font-semibold">{quesData.length}</p>
                        }
                    </div>
                </div>
                <div onClick={() => handleSection("answer")} className={` ${section === "answer" ? "bg-blue-500 text-white" : "bg-white"} cursor-pointer hover:bg-slate-200 hover:text-black active:bg-slate-300 border-2 border-l-[1px] rounded-r-full border-gray-700 flex gap-1 w-full h-12 justify-center items-center transition-all duration-150 ease-in-out`}>
                    <div className='flex gap-1 items-baseline'>
                        <p className=" text-sm">Answers</p>
                        <p className=" text-lg font-semibold">0</p>
                    </div>
                </div>
            </div>
            {
                section === "question" ? (
                    <div className="p-2 relative bg-white h-auto w-full flex flex-col gap-4 md:gap-8">
                        {
                            isQuesLoading ? (<h2 className=" text-center">Loading Questions...</h2>) :
                                quesError ? (<h2 className=" text-center">Something went wrong</h2>) :
                                    quesData.length === 0 ? (
                                        <div className="mt-12 flex w-full justify-center flex-col items-center">
                                            <h1 className=" text-3xl font-semibold">No Questions Yet</h1>
                                            {/* <p className=" text-blue-500">Ask Question</p> */}
                                        </div>
                                    ) :
                                        quesData.map((feed) => (
                                            <Feed key={feed._id} {...feed} />
                                        ))
                        }
                    </div>
                ) : (
                    <div className="p-2 relative  h-auto w-full flex flex-col gap-4 md:gap-8">
                        {
                            isQuesLoading ? (<h2 className=" text-center">Loading Answers...</h2>) :
                                quesError ? (<h2 className=" text-center">Something went wrong</h2>) :
                                    <div className="mt-12 flex w-full justify-center flex-col items-center">
                                        <h1 className=" text-3xl font-semibold">No Answers Yet</h1>
                                    </div>

                        }
                    </div>
                )
            }
        </div>
    )
}

export default Profile