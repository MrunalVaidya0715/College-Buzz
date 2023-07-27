import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineExplore, MdOutlineLogout } from 'react-icons/md'
import { RiQuestionAnswerLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { DiGhostSmall } from 'react-icons/di'
import { Link, useNavigate } from 'react-router-dom'
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
const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await newRequest.post('auth/logout')
            localStorage.setItem('currentUser', null)
            navigate('/')
            window.location.reload(true)
        } catch (error) {
            alert(error)
        }
    }

    const active = true;
    return (
        <div className=" w-[25%] hidden lg:flex flex-col justify-between gap-2 p-2">
            <div className='w-full flex flex-col gap-2'>
                <div className={` ${active ? "bg-blue-200 text-blue-600 border-l-4 border-blue-700" : "text-gray-500"} group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2  items-center`}>
                    <span className='group-hover:text-gray-800'><DiGhostSmall size={20} /></span>
                    <p className='group-hover:text-gray-800'>Menu</p>
                </div>
                {
                    links.map((link) => (
                        <div key={link.id} className=" group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2 text-gray-500 items-center">
                            <span className='group-hover:text-gray-800'>{link.icon}</span>
                            <p className=' whitespace-nowrap group-hover:text-gray-800'>{link.name}</p>
                        </div>
                    ))
                }
            </div>
            {
                user && (
                    <div className='w-full flex flex-col gap-2'>
                        <Link to="/profile">
                            <div className=" group cursor-pointer p-2 text-sm font-medium w-full hover:bg-gray-200 flex gap-2 text-gray-500 items-center">
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