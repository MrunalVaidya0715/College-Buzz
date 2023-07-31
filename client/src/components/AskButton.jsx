import { IoMdAdd } from 'react-icons/io'
const AskButton = ({ ask, handleAsk }) => {

    return (

        <div onClick={handleAsk} className={` ${ask ? "hidden" : "block"} cursor-pointer z-[200] md:hidden fixed bottom-4 right-2 p-4 bg-blue-500 rounded-full`}>
            <IoMdAdd className=' text-white' size={22} />
        </div>



    )
}

export default AskButton