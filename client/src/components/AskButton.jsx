import { IoMdAdd } from 'react-icons/io'
import { useContext } from 'react';
import { AskButtonContext } from '../context/AskButtonContext'

const AskButton = () => {
    const { ask, setAsk } = useContext(AskButtonContext)

    return (

        <div onClick={() => setAsk(true)} className={` ${ask ? "hidden" : "block"} cursor-pointer z-[200] fixed md:hidden bottom-4 right-2  p-4 bg-blue-500 rounded-full transition-all ease-in-out duration-1000`}>
            <IoMdAdd className=' text-white' size={22} />
        </div >




    )
}

export default AskButton