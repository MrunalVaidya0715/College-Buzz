import { IoMdAdd } from 'react-icons/io'
const AskButton = ({ ask, handleAsk }) => {

    return (

        <div onClick={handleAsk} className={` ${ask ? "hidden" : "block"} cursor-pointer z-[200] fixed bottom-4 right-2 xl:right-[10%] p-4 bg-blue-500 rounded-full transition-all ease-in-out duration-1000`}>
            <IoMdAdd className=' text-white' size={22} />
        </div>



    )
}

export default AskButton