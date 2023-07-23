import { useState } from 'react'
import { BiUpArrowAlt } from 'react-icons/bi'
import { IoAddOutline, IoClose } from 'react-icons/io5'
const topQ = [
    {
        id: 1,
        rank: 1,
        title: "Cracking the College Admissions Code: Tips & Tricks",
        upvotes: 37,
    },
    {
        id: 2,
        rank: 2,
        title: "Navigating Freshman Year: Tips for a Successful Start!",
        upvotes: 35,
    },
    {
        id: 3,
        rank: 3,
        title: "Balancing Act: Juggling Academics, Work & Social Life",
        upvotes: 34,
    },
    {
        id: 4,
        rank: 4,
        title: "Beyond the Pages: Book Club's Virtual Retreat",
        upvotes: 28,
    },
    {
        id: 5,
        rank: 5,
        title: "Dorm Hacks 101: Transform Your Room into a Cozy Haven",
        upvotes: 22,
    },
]
const Section = () => {
    const [modal, setModal] = useState(false)
    return (
        <div className=" w-[20%] hidden md:flex flex-col gap-8 p-2">
            {/** */}
            <div className='w-full flex justify-center'>
                <button onClick={() => setModal(prev => !prev)} className='bg-blue-700 flex items-center justify-center gap-1 w-full p-2 rounded-md text-white'><IoAddOutline size={20} />Ask Question</button>
            </div>
            {
                modal && (
                    <div className='z-[100] top-0 right-0 bg-black/50 absolute flex w-full h-screen items-center justify-center'>
                        <div onClick={()=>setModal(false)} className=' absolute top-4 right-4 p-2 bg-white rounded-full'>
                            <IoClose size={16}/>
                        </div>
                        <div className=' flex flex-col items-center w-full max-w-[700px] h-[600px] p-4 bg-white'>
                            <h1 className=' text-xl font-semibold'>Ask Question</h1>
                        </div>
                    </div>
                )
            }
            {/**Top Questions */}
            <div className="border-[1px] bg-white shadow-md px-2 py-4 w-full flex flex-col gap-2">
                <h1 className=" font-bold">Top Questions</h1>
                <div className="mt-4 w-full overflow-x-auto flex flex-col gap-2">
                    {
                        topQ.map((que) => (
                            <div key={que.id} className="w-full flex gap-1 items-baseline justify-between">
                                <p className=' font-semibold'>{que.rank}.</p>
                                <div className='flex overflow-x-auto scrollbar-none flex-nowrap items-center'>
                                    <p className=' whitespace-nowrap text-sm '>{que.title}</p>
                                </div>
                                <div className='ml-1 flex items-center'>
                                    <p className=' text-sm font-bold text-blue-600'>{que.upvotes}</p>
                                    <BiUpArrowAlt />
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    )
}

export default Section