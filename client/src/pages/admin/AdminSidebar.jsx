import { BsPeople } from 'react-icons/bs'
import { MdLogout, MdOutlineDashboard, MdSettings } from 'react-icons/md'
import { VscNote } from 'react-icons/vsc'
import { GoReport } from 'react-icons/go'
import { Link, useLocation, useNavigate } from "react-router-dom"
import newRequest from '../../../utils/newRequest'


const links = [
    {
        id: 1,
        path: "/admin",
        name: "Dashboard",
        icon: <MdOutlineDashboard className="text-[25px]" />
    },
    {
        id: 2,
        path: "/admin/users",
        name: "Users",
        icon: <BsPeople className="text-[25px]" />
    },
    {
        id: 3,
        path: "/admin/admin-posts",
        name: "Posts",
        icon: <VscNote className="text-[25px]" />
    },

    {
        id: 4,
        path: "/admin/reported-posts",
        name: "Reported Posts",
        icon: <GoReport className="text-[25px]" />
    },

]


const AdminSidebar = () => {
    const location = useLocation()
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
    return (
        <div className="w-[220px] flex bg-white border-r-[1px] h-full">
            <div className="flex flex-col w-full h-full">
                <div className='mt-1 p-4 flex w-full justify-center items-center border-b-[1px] h-16'>
                    <div>
                        <Link to='/'>
                            <h1 className='flex text-lg font-bold'>College<span className=' text-blue-600 flex'>Buzz</span></h1>
                        </Link>
                    </div>
                </div>
                <div className="mt-4 flex flex-col overflow-y-auto p-4 items-center justify-between w-full h-full">
                    {/**Actions */}
                    <div className="flex w-full flex-col gap-2">
                        {
                            links.map((link) => (
                                <Link key={link.id} to={`${link.path}`}>

                                    <div className={` ${location.pathname === link.path ? "bg-sky-100 text-blue-600" : "text-gray-400"} hover:bg-slate-100 hover:text-gray-600 p-2 flex w-full justify-start rounded-md  gap-4 ease-in-out duration-150 transition-all`}>
                                        {link.icon}

                                        <span className="  whitespace-nowrap font-medium tracking-wide ">{link.name}</span>

                                    </div>
                                </Link>
                            ))
                        }

                    </div>
                    {/**Settings */}
                    <div className="flex w-full flex-col gap-2">

                        <Link to="/admin/settings">
                            <div onClick={handleLogout} className={` ${location.pathname === "/admin/settings" ? "bg-sky-100 text-blue-600" : "text-gray-400"} hover:bg-slate-100 hover:text-gray-600 p-2 flex w-full justify-start text-gray-400 rounded-md  gap-4 ease-in-out duration-150 transition-all`}>
                                <MdSettings className='text-[25px]' />
                                <span className=" font-medium tracking-wide ">Settings</span>
                            </div>
                        </Link>
                        <div onClick={handleLogout} className=" cursor-pointer p-2 flex w-full justify-start text-gray-400 hover:bg-slate-100 hover:text-gray-600 rounded-md  gap-4 ease-in-out duration-150 transition-all">
                            <MdLogout className='text-[25px]' />
                            <span className=" font-medium tracking-wide ">Logout</span>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default AdminSidebar