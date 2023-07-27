import { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { MdOutlineExplore, MdOutlineLogout } from 'react-icons/md'
import { RiQuestionAnswerLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { Link, useNavigate } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoAddOutline, IoClose } from 'react-icons/io5'
import newRequest from '../../utils/newRequest'

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
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const navigate = useNavigate()

    const [options, setOptions] = useState(false)
    const [err, setErr] = useState(null)
    const handleOptions = () => {

        setOptions(prev => !prev)

    }
    const handleLogout = async () => {
        try {
            await newRequest.post('auth/logout')
            localStorage.setItem('currentUser', null)
            navigate('/')
            window.location.reload(true)
        } catch (error) {
            setErr(err.response.data)
            alert(error)
        }
    }
    const [modal, setModal] = useState(false)
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [question, setQuestion] = useState({
        title: "",
        desc: description,
        category: "",

    });

    const handleChange = (e) => {
        setQuestion((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true)
        try {
            await newRequest.post('/questions', {
                ...question,

            })
            setUploading(false)
            alert("Question Uploaded")
            setModal(false)
            navigate('/')

        } catch (error) {
            setErr(error.response.data)
            setUploading(false)
            console.log(error)

        }

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
                        <input className='text-black w-full bg-transparent outline-none p-1 rounded-md' type="text" placeholder={user?.username} />
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    {
                        user ? (<img className=" rounded-full w-9 min-w-9 h-9 min-h-9 object-cover  object-center" src={user.profileImg || "/assets/noProfile.png"} alt="PI" />) : (
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
                        <div className={` ${options ? 'opacity-0' : ''} absolute bg-gray-400 top-0 w-full h-[15%] rounded-md transition-all duration-200`}></div>
                        <div className={` ${options ? 'rotate-45' : ''} absolute bg-gray-400 top-[40%] w-full h-[15%] rounded-md transition-all duration-200`}></div>
                        <div className={` ${options ? '-rotate-45' : ''} absolute bg-gray-400 top-[40%] w-full h-[15%] rounded-md transition-all duration-200`}></div>
                        <div className={` ${options ? 'opacity-0' : ''} absolute bg-gray-400 bottom-0 w-full h-[15%] rounded-md transition-all duration-200`}></div>
                    </div>

                </div>
                {/* Overlay */}
                {
                    options && <div onClick={() => setOptions(false)} className=' absolute top-0 right-0 w-full h-screen' />
                }
                {/*Options */}
                {
                    options && (
                        <div className='lg:hidden mr-2 absolute bg-white/70 backdrop-blur-md rounded-lg right-0 w-fit top-20 p-4 border-[1px] border-gray-300'>
                            <div className='flex flex-col gap-2 w-full'>
                                <input className='md:hidden text-black w-full border-[1px] border-gray-300 bg-transparent outline-none p-1 rounded-md' type="text" placeholder='Search for Topics' />
                                {
                                    user ? (<div className='md:hidden w-full flex justify-center'>
                                        <button onClick={() => setModal(true)} className='bg-blue-700 hover:opacity-70 active:opacity-30 w-full max-w-[200px] p-2 rounded-md text-white transition-all duration-200 ease-in-out'>Ask Question</button>
                                    </div>) : (
                                        <>
                                            <Link onClick={() => setOptions(false)} to='/register'>
                                                <button className='w-full p-2 bg-blue-600 text-white rounded-md border-[1px] border-blue-600 whitespace-nowrap'>Sign Up</button>
                                            </Link>
                                            <Link onClick={() => setOptions(false)} to='/login'>
                                                <button className='w-full p-2 bg-white text-blue-600 rounded-md border-[1px] border-blue-600 whitespace-nowrap'>Sign In</button>
                                            </Link>
                                        </>
                                    )
                                }

                                {
                                    links.map((link) => (
                                        <div onClick={() => setOptions(false)} key={link.id} className=" group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2 text-gray-500 items-center">
                                            <span className='group-hover:text-gray-800'>{link.icon}</span>
                                            <p className=' whitespace-nowrap group-hover:text-gray-800'>{link.name}</p>
                                        </div>
                                    ))
                                }
                                {
                                    user && (
                                        <>
                                            <Link to={`/profile/${user._id}`}>
                                                <div onClick={() => setOptions(false)} className=" group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2 text-gray-500 items-center">
                                                    <span className='group-hover:text-gray-800'><CgProfile size={20} /></span>
                                                    <p className=' whitespace-nowrap group-hover:text-gray-800'>My Profile</p>
                                                </div>
                                            </Link>
                                            <div onClick={handleLogout} className=" group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2 text-gray-500 items-center">
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
            {
                modal && (
                    <div className='z-[100] top-0 right-0 bg-black/50 absolute flex w-full h-screen items-center justify-center'>
                        <div onClick={() => setModal(false)} className=' cursor-pointer absolute top-4 right-4 p-2 bg-white rounded-full'>
                            <IoClose size={16} />
                        </div>
                        <div className='py-4 overflow-y-auto scrollbar-w-2 scrollbar-thumb-gray-400 scrollbar scrollbar-thumb-rounded-lg scrollbar-track-gray-200  flex flex-col gap-4 items-center w-[90%] max-w-[700px] h-[600px] p-4 bg-white'>
                            <h1 className=' text-xl font-semibold'>Ask Question</h1>
                            <div className='flex flex-col w-full max-w-[500px]'>
                                <p className=' font-semibold'>Title</p>
                                <input onChange={handleChange} className=' border-[1px] p-2' type="text" placeholder='Enter Title' name='title' />
                            </div>
                            <div className='flex flex-col w-full max-w-[500px]'>
                                <p className=' font-semibold'>Select Category</p>
                                <select onChange={handleChange} className='cursor-pointer border-[1px] p-2' name="category" defaultValue="--select category--">
                                    <option disabled>--select category--</option>
                                    <option value="general">General</option>
                                    <option value="technology">Technology</option>
                                    <option value="sports">Sports</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="exams">Examinations</option>
                                    <option value="canteen">Canteen</option>
                                </select>
                            </div>
                            <div className=' flex flex-col w-full max-w-[500px]'>
                                <p className=' font-semibold'>Enter Description</p>
                                <ReactQuill theme="snow" value={question.desc} onChange={(value) => setQuestion((prev) => ({ ...prev, desc: value }))} />
                            </div>
                            <div className='mt-16 w-full flex justify-center'>
                                <button onClick={handleSubmit} className='bg-blue-700 hover:opacity-70 active:opacity-30 flex items-center justify-center gap-1 w-full max-w-[500px] p-2 rounded-md text-white ease-in-out transition-all duration-200'><IoAddOutline size={20} />Ask Question</button>
                            </div>
                            <div>
                                <p className=" text-center text-red-500 font-semibold">{err && err}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Navbar