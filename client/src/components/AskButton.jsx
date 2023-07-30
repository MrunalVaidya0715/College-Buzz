import {IoMdAdd} from 'react-icons/io'
const AskButton = ({ask, handleAsk}) => {

  return (
    <div onClick={handleAsk} className='z-[200] border-[1px] border-gray-400 md:hidden absolute bottom-4 right-2 p-4 bg-blue-500 rounded-full'>
        <IoMdAdd className=' text-white' size={22}/>
    </div>
  )
}

export default AskButton