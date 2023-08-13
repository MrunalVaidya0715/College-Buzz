import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi'
import { BsDash } from 'react-icons/bs'
import { IoAddOutline, IoClose } from 'react-icons/io5'
import { ImSpinner6 } from 'react-icons/im'
import { MdOutlineChevronLeft } from 'react-icons/md'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import newRequest from '../../utils/newRequest';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Badwords from './Badwords'
import Filter from 'bad-words'
import { useQuery } from '@tanstack/react-query'
const Section = ({ isLoading, error, data, ask, handleAsk }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    
    const [isWidget, setIsWidget] = useState(false)
    
    const { isLoading: isBWLoading, error: BWError, data: badwords } = useQuery({
        queryKey: ["badwords"],
        queryFn: () =>
            newRequest.get(`badwords`).then((res) => {
                return res.data;
            }),
    });
    const newBadWords = [];
    if (!(isBWLoading || BWError)) {
        badwords.map((word) => newBadWords.push(word.word))
    }

    const filter = new Filter({ regex: /\*|\.|$/gi })
    filter.addWords(...newBadWords);
    
    const handleWidget = () => {
        setIsWidget(prev => !prev)
    }

    return (
        <>
            { isWidget && <div onClick={()=>setIsWidget(false)} className='z-[200] md:hidden fixed top-0 right-0 h-full w-full bg-black/20' />}
            <div className={` h-fit z-[201] md:z-[0] bg-white md:bg-transparent rounded-l-lg fixed ${isWidget ? "translate-x-0" : "translate-x-[100%]"} md:translate-x-0  md:translate-y-0 right-0 md:static max-w-[75%] sm:max-w-[60%] md:w-[20%] md:min-w-[20%] flex flex-col gap-8 p-2 transition-all ease-in-out duration-500`}>
                <div onClick={handleWidget} className={`${isWidget ? "opacity-100": "opacity-50"} hover:opacity-100 cursor-pointer md:hidden p-2 rounded-full absolute top-[10%] ${isWidget? "-translate-x-8":"-translate-x-9"} z-[100] bg-blue-700 transition-all ease-in-out duration-500`}>
                    <MdOutlineChevronLeft className={` text-white text-2xl ${isWidget?" rotate-180":""} transition-all ease-in-out duration-500 `} />
                </div>
                {/** */}
                <div className='w-full flex justify-center'>
                    {
                        user ? (
                            <button onClick={handleAsk} className=' whitespace-nowrap bg-blue-700 hover:opacity-70 active:opacity-30 hidden md:flex items-center justify-center gap-1 w-full p-2 rounded-md text-white ease-in-out transition-all duration-200'><IoAddOutline size={20} />Ask Question</button>
                        ) : (
                            <Link className='w-full' to="/login">
                                <button className=' whitespace-nowrap bg-blue-700 hover:opacity-70 active:opacity-30 hidden md:flex items-center justify-center gap-1 w-full p-2 rounded-md text-white ease-in-out transition-all duration-200'><IoAddOutline size={20} />Ask Question</button>
                            </Link>
                        )
                    }
                </div>
                
                {/**Top Questions */}
                <div className="border-[1px] bg-white shadow-sm px-2 py-4 w-full flex flex-col gap-2">
                    <h1 className=" text-center font-bold">Top Questions</h1>

                    <div className="mt-2 w-full overflow-x-auto flex flex-col gap-3">
                        {
                            isLoading ? <Skeleton className='mt-4 w-full' count={5} /> :
                                error ? "Something went wrong" :
                                    data.map((que, i) => (
                                        <div onClick={()=>setIsWidget(false)} key={i} className="w-full flex gap-1 items-baseline justify-between">
                                            <div className='flex overflow-x-auto scrollbar-none items-center gap-1'>
                                                <p className=' font-semibold'>{i + 1}.</p>
                                                <Link to={`posts/${que._id}`}>
                                                    <div className='group flex overflow-x-auto scrollbar-none flex-nowrap items-centers'>
                                                        <p className='group-hover:text-blue-500 group-hover:underline-offset-2 group-hover:underline whitespace-nowrap text-sm '>{filter.clean(que.title)}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className='ml-1 flex items-center'>
                                                {
                                                    que.upvote - que.downvote > 0 ? (
                                                        <>
                                                            <p className=' text-sm font-bold text-blue-600'>{que.upvote - que.downvote}</p>
                                                            <BiUpArrowAlt />
                                                        </>
                                                    ) :
                                                        que.upvote - que.downvote < 0 ? (
                                                            <>
                                                                <p className=' text-sm font-bold text-red-500'>{que.upvote - que.downvote}</p>
                                                                <BiDownArrowAlt />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className=' text-sm font-bold text-gray-500'>{que.upvote - que.downvote}</p>
                                                                <BsDash />
                                                            </>
                                                        )

                                                }
                                            </div>
                                        </div>
                                    ))
                        }


                    </div>
                </div>
                {
                    user && <Badwords />
                }
            </div>
        </>
    )
}

export default Section