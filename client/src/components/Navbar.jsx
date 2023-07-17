import { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { MdOutlineExplore, MdOutlineLogout } from 'react-icons/md'
import { RiQuestionAnswerLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { Link } from "react-router-dom"
const links = [
    {
        id: 1,
        name: "Home",
        icon: <AiOutlineHome size={20} />
    },
    {
        id: 2,
        name: "Explore Questions",
        icon: <MdOutlineExplore size={20} />
    },
    {
        id: 3,
        name: "My Questions",
        icon: <RiQuestionAnswerLine size={20} />

    },

]

const Navbar = () => {
    const user = false
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
                    <Link to='/'>
                        <h1 className=' font-bold'>College<span className=' text-blue-600'>Buzz</span></h1>
                    </Link>
                </div>
                <div className='hidden md:flex '>

                    <div className="flex gap-2 text-gray-400 bg-gray-200 items-center px-2 py-1 rounded-lg">
                        <BiSearch className=' text-[22px]' />
                        <input className='text-black w-full bg-transparent outline-none p-1 rounded-md' type="text" placeholder='Search for Topics' />
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    {
                        user ? (<img className=" rounded-full w-9 min-w-9 h-9 min-h-9 object-cover  object-center" src="/assets/cbProfile.jpeg" alt="PI" />) : (
                            <>
                                <Link to='/register'>
                                    <button className='hidden lg:block p-2 bg-blue-600 text-white rounded-md border-[1px] border-blue-600 whitespace-nowrap'>Sign Up</button>
                                </Link>
                                <Link to='/login'>
                                    <button className='hidden lg:block p-2 bg-white text-blue-600 rounded-md border-[1px] border-blue-600 whitespace-nowrap'>Sign In</button>
                                </Link>
                            </>
                        )
                    }
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
                        <div className='lg:hidden mr-2 absolute bg-white/70 backdrop-blur-sm rounded-lg right-0 w-fit top-20 p-4 border-[1px] border-gray-300'>
                            <div className='flex flex-col gap-2 w-full'>
                                <input className='md:hidden text-black w-full border-[1px] border-gray-300 bg-transparent outline-none p-1 rounded-md' type="text" placeholder='Search for Topics' />
                                {
                                    user ? (<div className='md:hidden w-full flex justify-center'>
                                        <button className='bg-blue-700 w-full max-w-[200px] p-2 rounded-md text-white'>Ask Question</button>
                                    </div>) : (
                                        <>
                                            <Link to='/register'>
                                                <button className='w-full p-2 bg-blue-600 text-white rounded-md border-[1px] border-blue-600 whitespace-nowrap'>Sign Up</button>
                                            </Link>
                                            <Link to='/login'>
                                                <button className='w-full p-2 bg-white text-blue-600 rounded-md border-[1px] border-blue-600 whitespace-nowrap'>Sign In</button>
                                            </Link>
                                        </>
                                    )
                                }

                                {
                                    links.map((link) => (
                                        <div key={link.id} className=" group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2 text-gray-500 items-center">
                                            <span className='group-hover:text-gray-800'>{link.icon}</span>
                                            <p className=' whitespace-nowrap group-hover:text-gray-800'>{link.name}</p>
                                        </div>
                                    ))
                                }
                                {
                                    user && (
                                        <>
                                            <div className=" group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2 text-gray-500 items-center">
                                                <span className='group-hover:text-gray-800'><CgProfile size={20} /></span>
                                                <p className=' whitespace-nowrap group-hover:text-gray-800'>My Profile</p>
                                            </div>
                                            <div className=" group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2 text-gray-500 items-center">
                                                <span className='group-hover:text-gray-800'><MdOutlineLogout size={20} /></span>
                                                <p className=' whitespace-nowrap group-hover:text-gray-800'>Logout</p>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Navbar