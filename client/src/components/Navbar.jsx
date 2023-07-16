import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'

const links = [
    {
        id: 1,
        name: "Home",
    },
    {
        id: 2,
        name: "Explore Questions",
    },
    {
        id: 3,
        name: "My Questions",
    },

]

const Navbar = () => {
    const [active, setActive] = useState(false)
    const [options, setOptions] = useState(false)

    const handleOptions = () => {
        setActive(prev => !prev)
        setOptions(prev => !prev)

    }
    return (
        <div className=" z-[100] fixed top-0 left-0 h-16 w-full  bg-white flex justify-center  shadow-md">
            <div className=" relative px-2 w-full h-full max-w-[1200px] flex gap-4 items-center justify-between">
                <div>
                    <h1 className=' font-bold'>College<span className=' text-blue-600'>Buzz</span></h1>
                </div>
                <div className='hidden lg:flex '>

                    <div className="flex gap-2 text-gray-400 bg-gray-200 items-center px-2 py-1 rounded-lg">
                        <BiSearch className=' text-[22px]' />
                        <input className='text-black w-full bg-transparent outline-none p-1 rounded-md' type="text" placeholder='Search for Topics' />
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <img className=" rounded-full w-9 min-w-9 h-9 min-h-9 object-cover  object-center" src="/assets/cbProfile.jpeg" alt="PI" />
                    <div onClick={handleOptions} className='z-[101] flex lg:hidden cursor-pointer relative w-8 h-[20px]'>
                        <div className={` ${active ? 'opacity-0' : ''} absolute bg-gray-400 top-0 w-full h-[15%] rounded-md transition-all duration-200`}></div>
                        <div className={` ${active ? 'rotate-45' : ''} absolute bg-gray-400 top-[40%] w-full h-[15%] rounded-md transition-all duration-200`}></div>
                        <div className={` ${active ? '-rotate-45' : ''} absolute bg-gray-400 top-[40%] w-full h-[15%] rounded-md transition-all duration-200`}></div>
                        <div className={` ${active ? 'opacity-0' : ''} absolute bg-gray-400 bottom-0 w-full h-[15%] rounded-md transition-all duration-200`}></div>
                    </div>

                </div>

                {/*Options */}
                {
                    options && (
                        <div className='lg:hidden mr-2 absolute bg-white rounded-lg right-0 w-fit top-20 p-4 border-[1px] border-gray-300'>
                            <div className='flex flex-col gap-2 w-full'>
                                <input className='text-black w-full border-[1px] border-gray-300 bg-transparent outline-none p-1 rounded-md' type="text" placeholder='Search for Topics' />
                                <div className='w-full flex justify-center'>
                                    <button className='bg-blue-700 w-full max-w-[200px] p-2 rounded-md text-white'>Ask Question</button>
                                </div>
                                {
                                    links.map((link) => (
                                        <div key={link.id} className=' px-2 py-1 flex w-full border-l-4 border-blue-600 bg-blue-400 rounded-md'>
                                            <span className=' whitespace-nowrap cursor-pointer font-semibold text-lg'>{link.name}</span>
                                        </div>
                                    ))
                                }
                                <div className=' px-2 py-1 flex w-full border-l-4 border-blue-600 bg-blue-400 rounded-md'>
                                            <span className=' cursor-pointer font-semibold text-lg'>Logout</span>
                                        </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Navbar