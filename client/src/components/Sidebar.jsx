import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineExplore, MdOutlineLogout } from 'react-icons/md'
import { RiQuestionAnswerLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { LiaHandsHelpingSolid } from 'react-icons/lia'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import {toast} from 'react-hot-toast'
const links = [
    {
        id: 1,
        name: "Home",
        url: "/",
        icon: <AiOutlineHome size={20} />
    },
    {
        id: 2,
        name: "Explore Questions",
        url: "/explore",
        icon: <MdOutlineExplore size={20} />
    },
    {
        id: 3,
        name: "Contribute",
        url: "/contribute",
        icon: <LiaHandsHelpingSolid size={20} />
    },


]
const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const navigate = useNavigate()
    const location = useLocation()
    const handleLogout = async () => {
        try {
            await newRequest.post('auth/logout')
            localStorage.setItem('currentUser', null)
            navigate('/')
            window.location.reload(true)
        } catch (error) {
            toast.error(error)
        }
    }


    return (
        <div className=" w-[25%] hidden lg:flex flex-col justify-between gap-2 p-2">
            <div className='w-full flex flex-col gap-2'>
                
                {
                    links.map((link) => (
                        <Link key={link.id} to={link.url}>
                            <div className={` ${location.pathname === link.url ? "bg-blue-200 text-blue-600 border-r-4 border-blue-700" : "text-gray-500"} group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2  items-center`}>
                                <span className='group-hover:text-gray-800'>{link.icon}</span>
                                <p className=' whitespace-nowrap group-hover:text-gray-800'>{link.name}</p>
                            </div>
                        </Link>
                    ))
                }
                {
                    user && (
                        <Link to={`/my-questions/${user?._id}`}>
                            <div className={` ${location.pathname === `/my-questions/${user?._id}` ? "bg-blue-200 text-blue-600 border-r-4 border-blue-700" : "text-gray-500"} group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2  items-center`}>
                                <span className='group-hover:text-gray-800'><RiQuestionAnswerLine size={20} /></span>
                                <p className=' whitespace-nowrap group-hover:text-gray-800'>My Questions</p>
                            </div>
                        </Link>
                    )
                }
            </div>
            {
                user && (
                    <div className='w-full flex flex-col gap-2'>
                        <Link to={`/profile/${user._id}`}>
                            <div className={` ${location.pathname === `/profile/${user?._id}` ? "bg-blue-200 text-blue-600 border-r-4 border-blue-700" : "text-gray-500"} group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2  items-center`}>
                                <span className='group-hover:text-gray-800'><CgProfile size={20} /></span>
                                <p className='group-hover:text-gray-800'>My Profile</p>
                            </div>
                        </Link>
                        <div onClick={handleLogout} className=" group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2 text-gray-500 items-center">
                            <span className='group-hover:text-gray-800'><MdOutlineLogout size={20} /></span>
                            <p className='group-hover:text-gray-800'>Logout</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Sidebar