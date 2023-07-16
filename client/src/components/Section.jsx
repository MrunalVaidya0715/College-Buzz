import { BiUpArrowAlt } from 'react-icons/bi'

const topQ = [
    {
        id: 1,
        rank: 1,
        title: "What does the Fox says",
        upvotes: 78,
    },
    {
        id: 2,
        rank: 2,
        title: "What does the Fox says",
        upvotes: 65,
    },
    {
        id: 3,
        rank: 3,
        title: "What does the Fox says",
        upvotes: 61,
    },
    {
        id: 4,
        rank: 4,
        title: "What does the Fox says",
        upvotes: 55,
    },
    {
        id: 5,
        rank: 5,
        title: "What does the Fox says",
        upvotes: 49,
    },
]
const Section = () => {
    return (
        <div className=" w-[25%] hidden md:flex flex-col gap-8 p-2">
            {/** */}
            <div className='w-full flex justify-center'>
                <button className='bg-blue-700 w-full max-w-[200px] p-2 rounded-md text-white'>Ask Question</button>
            </div>
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