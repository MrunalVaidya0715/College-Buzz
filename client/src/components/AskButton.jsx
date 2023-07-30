import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
const AskButton = ({ ask, handleAsk }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    return (
        <>
            {
                user ? (
                    <>
                        <div onClick={handleAsk} className={` ${ask ? "hidden" : "block"} cursor-pointer z-[200] md:hidden absolute bottom-4 right-2 p-4 bg-blue-500 rounded-full`}>
                            <IoMdAdd className=' text-white' size={22} />
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <div  className={` ${ask ? "hidden" : "block"} cursor-pointer z-[200] md:hidden absolute bottom-4 right-2 p-4 bg-blue-500 rounded-full`}>
                                <IoMdAdd className=' text-white' size={22} />
                            </div>
                        </Link>
                    </>
                )
            }
        </>

    )
}

export default AskButton